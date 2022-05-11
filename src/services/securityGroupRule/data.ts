import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { SecurityGroupRule } from 'tencentcloud-sdk-nodejs/tencentcloud/services/cfw/v20190904/cfw_models'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import loggerText from '../../properties/logger'
import { TencentServiceInput } from '../../types'
import { initTestEndpoint, generateTencentErrorLog } from '../../utils'

const lt = { ...loggerText }
const { logger } = CloudGraph
export const serviceName = 'SecurityGroupRule'
const apiEndpoint = initTestEndpoint(serviceName)
const MAX_ITEMS = '50'

export interface RawTencentSecurityGroupRule extends SecurityGroupRule {
  id: string
  region: string
}

export default async ({
  regions,
  config,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentSecurityGroupRule[]
}> =>
  new Promise(async resolve => {
    const ruleList: RawTencentSecurityGroupRule[] = []

    for (const region of regions.split(',')) {
      /**
       * Get all security group rules
       */
      try {
        const CfwClient = tencentcloud.cfw.v20190904.Client
        const clientConfig: ClientConfig  = { credential: config, region, profile: { httpProfile: { endpoint: apiEndpoint } } }
        const cfw = new CfwClient(clientConfig)
        let marker = 0
        let rules = []

        do {
          marker++
          let response = await cfw.DescribeEnterpriseSecurityGroupRule({ PageNo: marker.toString(), PageSize: MAX_ITEMS })
          if (response && !isEmpty(response.Rules)) {
            rules = response.Rules
            for (const instance of rules) {
              ruleList.push({
                id: instance.Id,
                ...instance,
                region,
              })
            }
          }
        } while (!isEmpty(rules))
      } catch (error) {
        generateTencentErrorLog(serviceName, 'cfw:DescribeEnterpriseSecurityGroupRule', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, ruleList.length))
    resolve(groupBy(ruleList, 'region'))
  })
