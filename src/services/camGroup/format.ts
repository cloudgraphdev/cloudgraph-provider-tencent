import { TencentCamGroup } from '../../types/generated'
import { RawTencentCamGroup } from './data'

export default ({
  service,
}: {
  service: RawTencentCamGroup
}): TencentCamGroup => {
  const {
    id,
    region,
    GroupName: name,
    CreateTime: createTime,
    Remark: remark
  } = service

  return {
    id,
    region,
    name,
    createTime,
    remark,
  }
}
