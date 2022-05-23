import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { SubAccountInfo } from 'tencentcloud-sdk-nodejs/tencentcloud/services/cam/v20190116/cam_models'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'CamUser'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentCamUser extends SubAccountInfo {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentCamUser[]
}> =>
  new Promise(async resolve => {
    const camUserList: RawTencentCamUser[] = []

    for (const region of regions.split(',')) {
      try {
        const CamClient = tencentcloud.cam.v20190116.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const cam = new CamClient(clientConfig)

        const response =  await cam.ListUsers(null)

        if (response && !isEmpty(response.Data)) {
          for (const instance of response.Data) {
            camUserList.push({
              id: `${region}-${instance.Uid}`,
              ...instance,
              region,
            })
          }
        }
      } catch (error) {
        generateTencentErrorLog(serviceName, 'cam:ListUsers', error)
      }
    }
    logger.debug(lt.foundResources(serviceName, camUserList.length))
    resolve(groupBy(camUserList, 'region'))
  })
