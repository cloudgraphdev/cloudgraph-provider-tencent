import { TencentCamPolicy } from '../../types/generated'
import { RawTencentCamPolicy } from './data'

export default ({
  service,
  region,
}: {
  service: RawTencentCamPolicy
  region: string
}): TencentCamPolicy => {
  const {
    id,
    PolicyName: name,
    AddTime: addTime,
    Type: type,
    Description: description,
    CreateMode: createMode,
    Attachments: attachments,
    ServiceType: serviceType,
    IsAttached: isAttached = 0,
    Deactived: deactived,
    DeactivedDetail: deactivedDetail,
    IsServiceLinkedPolicy: isServiceLinkedPolicy,
    AttachEntityCount: attachEntityCount,
    AttachEntityBoundaryCount: attachEntityBoundaryCount,
    UpdateTime: updateTime,
  } = service

  return {
    id: `${id}`,
    region,
    name,
    addTime,
    type,
    description,
    createMode,
    attachments,
    serviceType,
    isAttached,
    deactived,
    deactivedDetail,
    isServiceLinkedPolicy,
    attachEntityCount,
    attachEntityBoundaryCount,
    updateTime,
  }
}
