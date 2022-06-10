import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { GroupInfo } from 'tencentcloud-sdk-nodejs/tencentcloud/services/cam/v20190116/cam_models'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'CamGroup'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentCamGroup extends GroupInfo {
  id: string
  region: string
}

export default async ({
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentCamGroup[]
}> =>
  new Promise(async resolve => {
    const camGroupList: RawTencentCamGroup[] = []

    try {
      const CamClient = tencentcloud.cam.v20190116.Client
      const clientConfig: ClientConfig  = { credential: config, profile: { httpProfile: { endpoint: apiEndpoint } } }
      const cam = new CamClient(clientConfig)

      const response =  await cam.ListGroups(null)

      if (response && !isEmpty(response.GroupInfo)) {
        for (const instance of response.GroupInfo) {
          camGroupList.push({
            id: `${instance.GroupId}`,
            ...instance,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateTencentErrorLog(serviceName, 'cam:ListGroups', error)
    }

    logger.debug(lt.foundResources(serviceName, camGroupList.length))
    resolve(groupBy(camGroupList, 'region'))
  })
