import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { Subnet } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
const serviceName = 'Subnet'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentSubnet extends Subnet {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentSubnet[]
}> =>
  new Promise(async resolve => {
    const subnetList: RawTencentSubnet[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all the subnets
       */
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response =  await vpc.DescribeSubnets(null)

        if (response && !isEmpty(response.SubnetSet)) {
          for (const instance of response.SubnetSet) {
            subnetList.push({
              id: instance.SubnetId,
              ...instance,
              region,
            })
          }
        }
        
      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeSubnets', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, subnetList.length))
    resolve(groupBy(subnetList, 'region'))
  })
