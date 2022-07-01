import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { VpnGatewayRoute } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'
import services from '../../enums/services'
import { RawTencentVpnGateway } from '../vpnGateway/data'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'VpnGatewayRoute'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentVpnGatewayRoute extends VpnGatewayRoute {
  id: string
  vpnGatewayId: string
  region: string
}

export default async ({
  regions,
  config,
  rawData,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentVpnGatewayRoute[]
}> =>
  new Promise(async resolve => {
    const vpnGatewayRouteList: RawTencentVpnGatewayRoute[] = []

    const allVpnGateways: RawTencentVpnGateway[] =
      rawData.find(({ name }) => name === services.vpnGateway)?.data

    for (const region of regions.split(',')) {
      const vpnGatewaysInRegion = allVpnGateways[region] || []

      for (const vpnGateway of vpnGatewaysInRegion) {
        const vpnGatewayId = vpnGateway.id

        /**
         * Get all the VPN Gateway Route
         */
        try {
          const VpcClient = tencentcloud.vpc.v20170312.Client
          const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
          const vpc = new VpcClient(clientConfig)
          const response =  await vpc.DescribeVpnGatewayRoutes({
            VpnGatewayId: vpnGatewayId,
          })
          
          if (response && !isEmpty(response.Routes)) {
            for (const instance of response.Routes) {
              vpnGatewayRouteList.push({
                id: instance.RouteId,
                vpnGatewayId,
                ...instance,
                region,
              })
            }
          }
        } catch (error) {
          generateTencentErrorLog(serviceName, 'vpc:DescribeVpnGatewayRoutes', error)
        }
      }
    }

    logger.debug(lt.foundResources(serviceName, vpnGatewayRouteList.length))
    resolve(groupBy(vpnGatewayRouteList, 'region'))
  })
