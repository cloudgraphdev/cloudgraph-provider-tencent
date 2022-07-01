import cuid from 'cuid'
import { TencentNetworkAcl } from '../../types/generated'
import { RawTencentNetworkAcl } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawTencentNetworkAcl
  account: string
  region: string
}): TencentNetworkAcl => {
  const {
    id,
    NetworkAclName: name,
    VpcId: vpcId,
    CreatedTime: createdTime,
    IngressEntries,
    EgressEntries,
  } = service

  return {
    id,
    region,
    name,
    vpcId,
    createdTime,
    ingressEntries: IngressEntries?.map(naclEntry => ({
      id: cuid(),
      ...naclEntry,
    })),
    egressEntries: EgressEntries?.map(naclEntry => ({
      id: cuid(),
      ...naclEntry,
    })),
  }
}
