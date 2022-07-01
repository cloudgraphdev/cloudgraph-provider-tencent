import { TencentCustomerGateway } from '../../types/generated'
import { formatTagSet } from '../../utils/format'
import { RawTencentCustomerGateway } from './data'

export default ({
  service,
  region,
}: {
  service: RawTencentCustomerGateway
  region: string
}): TencentCustomerGateway=> {
  const {
    id,
    CustomerGatewayName: name,
    IpAddress: ipAddress,
    CreatedTime: createdTime,
    TagSet,
  } = service

  return {
    id,
    region,
    name,
    ipAddress,
    createdTime,
    tags: formatTagSet(TagSet),
  }
}
