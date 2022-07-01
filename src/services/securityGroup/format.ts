import cuid from 'cuid'
import { TencentSecurityGroup } from '../../types/generated'
import { RawTencentSecurityGroup } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawTencentSecurityGroup
  account: string
  region: string
}): TencentSecurityGroup => {
  const {
    id,
    SecurityGroupName: name,
    SecurityGroupDesc: securityGroupDesc,
    ProjectId: projectId,
    IsDefault: isDefault,
    CreatedTime: createdTime,
    TagSet,
    UpdateTime: updateTime,
  } = service

  return {
    id,
    region,
    name,
    securityGroupDesc,
    projectId,
    isDefault,
    createdTime,
    tags: TagSet?.map(tagSet => ({
      id: cuid(),
      key: tagSet.Key,
      value: tagSet.Value,
    })),
    updateTime,
  }
}
