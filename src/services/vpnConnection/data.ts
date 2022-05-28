import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { VpnConnection } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'VpnConnection'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentVpnConnection extends VpnConnection {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentVpnConnection[]
}> =>
  new Promise(async resolve => {
    const vpnConnectionList: RawTencentVpnConnection[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all the vpn gateways
       */
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response =  await vpc.DescribeVpnConnections(null)

        if (response && !isEmpty(response.VpnConnectionSet)) {
          for (const instance of response.VpnConnectionSet) {
            vpnConnectionList.push({
              id: instance.VpnConnectionId,
              ...instance,
              region,
            })
          }
        }
      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeVpnConnections', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, vpnConnectionList.length))
    resolve(groupBy(vpnConnectionList, 'region'))
  })
