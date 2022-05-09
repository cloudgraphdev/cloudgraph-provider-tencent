import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { SecurityGroup } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'SecurityGroup'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawTencentSecurityGroup extends SecurityGroup {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentSecurityGroup[]
}> =>
  new Promise(async resolve => {
    const vpcList: RawTencentSecurityGroup[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all security groups
       */
      try {
        const VpcClient = tencentcloud.vpc.v20170312.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const vpc = new VpcClient(clientConfig)
        const response = await vpc.DescribeSecurityGroups(null)

        if (response && !isEmpty(response.SecurityGroupSet)) {
          for (const instance of response.SecurityGroupSet) {
            vpcList.push({
              id: instance.SecurityGroupId,
              ...instance,
              region,
            })
          }
        }
        
      } catch (error) {
        generateTencentErrorLog(serviceName, 'vpc:DescribeSecurityGroups', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, vpcList.length))
    resolve(groupBy(vpcList, 'region'))
  })
