import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import CloudGraph from '@cloudgraph/sdk'
import tencentLoggerText from '../../properties/logger'
import { generateTencentErrorLog } from '../../utils'
import { TencentServiceInput } from '../../types'
import { TencentTag } from '../../types/generated'

const lt = { ...tencentLoggerText }
const { logger } = CloudGraph
export const serviceName = 'Tag'

export interface RawTencentTag extends TencentTag {
  id: string
  region: string
}

export default async ({
  rawData,
}: TencentServiceInput): Promise<{
  [region: string]: RawTencentTag[]
}> =>
  new Promise(async resolve => {
    const tagList: RawTencentTag[] = []

    try {
      for (const { data: entityData } of rawData) {
        for (const region of Object.keys(entityData)) {
          const dataAtRegion = entityData[region]
          dataAtRegion.forEach(singleEntity => {
            if (!isEmpty(singleEntity.TagSet)) {
              for (const tag of singleEntity.TagSet) {
                const { Key: key, Value: value } = tag
                if (
                  !tagList.find(
                    ({ id }) => id === `${singleEntity.id}:${key}:${value}`
                  )
                ) {
                  tagList.push({
                    id: `${singleEntity.id}:${key}:${value}`,
                    key,
                    value: String(value),
                    region,
                  })
                }
              }
            }
          })
        }
      }
    } catch (error: any) {
      generateTencentErrorLog(serviceName, '', error)
    }

    logger.debug(lt.foundResources(serviceName, tagList.length))
    resolve(groupBy(tagList, 'region'))
  })
