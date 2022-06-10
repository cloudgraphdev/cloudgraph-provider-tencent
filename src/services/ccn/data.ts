import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { CCN } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import cuid from 'cuid'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'Ccn'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentCcn extends CCN {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentCcn[]
}> =>
  new Promise(async resolve => {
    const ccnList: RawTencentCcn[] = []

    for (const region of regions.split(',')) {
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response = await vpc.DescribeCcns(null)
  
        if (response && !isEmpty(response.CcnSet)) {
          for (const instance of response.CcnSet) {
            ccnList.push({
              id: cuid(),
              ...instance,
              region,
            })
          }
        }

      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeCcns', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, ccnList.length))
    resolve(groupBy(ccnList, 'region'))
  })