import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { Cluster } from 'tencentcloud-sdk-nodejs/tencentcloud/services/tke/v20180525/tke_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
const serviceName = 'KubernetesEngine'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentKubernetesEngine extends Cluster {
  id: string
  region: string
  subnets: string[]
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentKubernetesEngine[]
}> =>
  new Promise(async resolve => {
    const clusterList: RawTencentKubernetesEngine[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all clusters
       */
      try {
        const TkeClient = tencentcloud.tke.v20180525.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const tke = new TkeClient(clientConfig)
        const response = await tke.DescribeClusters(null)

        if (response && !isEmpty(response.Clusters)) {
          for (const instance of response.Clusters) {
            clusterList.push({
              id: instance.ClusterId,
              ...instance,
              subnets: instance.ClusterNetworkSettings?.Subnets?.map(subnet => subnet),
              region,
            })
          }
        }
        
      } catch (error) {
        generateTencentErrorLog(serviceName, 'tke:DescribeClusters', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, clusterList.length))
    resolve(groupBy(clusterList, 'region'))
  })
