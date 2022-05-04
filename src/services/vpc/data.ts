import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { Vpc } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'Vpc'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentVpc extends Vpc {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentVpc[]
}> =>
  new Promise(async resolve => {
    const vpcList: RawTencentVpc[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all VPCs
       */
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response = await vpc.DescribeVpcs(null)

        if (response && !isEmpty(response.VpcSet)) {
          for (const instance of response.VpcSet) {
            vpcList.push({
              id: instance.VpcId,
              ...instance,
              region,
            })
          }
        }
        
      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeVpcInstances', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, vpcList.length))
    resolve(groupBy(vpcList, 'region'))
  })
