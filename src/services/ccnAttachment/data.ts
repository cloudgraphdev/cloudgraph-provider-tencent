import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { CcnAttachedInstance } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'CcnAttachment'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentCcnAttachment extends CcnAttachedInstance {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentCcnAttachment[]
}> =>
  new Promise(async resolve => {
    const ccnAttachmentList: RawTencentCcnAttachment[] = []

    for (const region of regions.split(',')) {
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response = await vpc.DescribeCcnAttachedInstances(null)
  
        if (response && !isEmpty(response.InstanceSet)) {
          for (const instance of response.InstanceSet) {
            ccnAttachmentList.push({
              id: `${instance.CcnId}-${instance.InstanceId}`,
              ...instance,
              region,
            })
          }
        }

      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeCcnAttachedInstances', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, ccnAttachmentList.length))
    resolve(groupBy(ccnAttachmentList, 'region'))
  })