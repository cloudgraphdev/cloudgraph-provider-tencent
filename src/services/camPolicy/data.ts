import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { StrategyInfo } from 'tencentcloud-sdk-nodejs/tencentcloud/services/cam/v20190116/cam_models'
import cuid from 'cuid'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'CamPolicy'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentCamPolicy extends StrategyInfo {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentCamPolicy[]
}> =>
  new Promise(async resolve => {
    const camPolicyList: RawTencentCamPolicy[] = []

    for (const region of regions.split(',')) {
      try {
        const CamClient = tencentcloud.cam.v20190116.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const cam = new CamClient(clientConfig)

        const response =  await cam.ListPolicies(null)

        if (response && !isEmpty(response.List)) {
          for (const instance of response.List) {
            camPolicyList.push({
              id: cuid(),
              ...instance,
              region,
            })
          }
        }
      } catch (error) {
        generateTencentErrorLog(serviceName, 'cam:ListPolicies', error)
      }
    }
    logger.debug(lt.foundResources(serviceName, camPolicyList.length))
    resolve(groupBy(camPolicyList, 'region'))
  })
