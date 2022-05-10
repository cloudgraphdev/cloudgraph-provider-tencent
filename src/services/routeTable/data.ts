import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'

import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import { RouteTable } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

export const serviceName = 'RouteTable'

const lt = { ...loggerText }
const apiEndpoint = initTestEndpoint(serviceName)
const { logger } = CloudGraph

export interface RawTencentRouteTable extends RouteTable {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentRouteTable[]
}> =>
  new Promise(async resolve => {
    const routeTableList: RawTencentRouteTable[] = []

    for (const region of regions.split(',')) {
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response = await vpc.DescribeRouteTables({})
        
        if (response && !isEmpty(response.RouteTableSet)) {
          for (const instance of response.RouteTableSet) {
            routeTableList.push({
              id: instance.RouteTableId,
              ...instance,
              region,
            })
          }
        }
      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeRouteTables', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, routeTableList.length))

    resolve(groupBy(routeTableList, 'region'))
  })
