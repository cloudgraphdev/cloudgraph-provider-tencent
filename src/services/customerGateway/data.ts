import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { CustomerGateway, Tag } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'CustomerGateway'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentCustomerGateway extends CustomerGateway {
  id: string
  region: string
  TagSet: Array<Tag>
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentCustomerGateway[]
}> =>
  new Promise(async resolve => {
    const customerGatewayList: RawTencentCustomerGateway[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all the vpn gateways
       */
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response =  await vpc.DescribeCustomerGateways(null)

        if (response && !isEmpty(response.CustomerGatewaySet)) {
          for (const instance of response.CustomerGatewaySet) {
            customerGatewayList.push({
              id: instance.CustomerGatewayId,
              ...instance,
              region,
              TagSet: (instance as any).TagSet,
            })
          }
        }
        
      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeCustomerGateways', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, customerGatewayList.length))
    resolve(groupBy(customerGatewayList, 'region'))
  })
