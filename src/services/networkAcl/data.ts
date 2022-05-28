import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { NetworkAcl } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'NetworkAcl'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentNetworkAcl extends NetworkAcl {
  id: string
  region: string
  subnets: string[]
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentNetworkAcl[]
}> =>
  new Promise(async resolve => {
    const naclList: RawTencentNetworkAcl[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all NetworkACLs
       */
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response = await vpc.DescribeNetworkAcls(null)

        if (response && !isEmpty(response.NetworkAclSet)) {
          for (const instance of response.NetworkAclSet) {
            naclList.push({
              id: instance.NetworkAclId,
              ...instance,
              subnets: instance?.SubnetSet?.map(subnet => subnet.SubnetId),
              region,
            })
          }
        }
      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeNetworkAcls', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, naclList.length))
    resolve(groupBy(naclList, 'region'))
  })
