import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { VpnGateway } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'VpnGateway'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentVpnGateway extends VpnGateway {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentVpnGateway[]
}> =>
  new Promise(async resolve => {
    const vpnGatewayList: RawTencentVpnGateway[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all the vpn gateways
       */
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response =  await vpc.DescribeVpnGateways(null)

        if (response && !isEmpty(response.VpnGatewaySet)) {
          for (const instance of response.VpnGatewaySet) {
            vpnGatewayList.push({
              id: instance.VpnGatewayId,
              ...instance,
              region,
            })
          }
        }
        
      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeVpnGateways', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, vpnGatewayList.length))
    resolve(groupBy(vpnGatewayList, 'region'))
  })
