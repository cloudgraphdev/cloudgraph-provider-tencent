import cuid from 'cuid'
import { TencentSubnet } from '../../types/generated'
import { RawTencentSubnet } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawTencentSubnet
  account: string
  region: string
}): TencentSubnet => {
  const {
    id,
    SubnetName: name,
    CidrBlock: cidrBlock,
    IsDefault: isDefault,
    EnableBroadcast: enableBroadcast,
    Zone: zone,
    RouteTableId: routeTableId,
    CreatedTime: createdTime,
    AvailableIpAddressCount: availableIpAddressCount,
    Ipv6CidrBlock: ipv6CidrBlock,
    NetworkAclId: networkAclId,
    IsRemoteVpcSnat: isRemoteVpcSnat,
    TotalIpAddressCount: totalIpAddressCount,
    TagSet,
    CdcId: cdcId,
    IsCdcSubnet: isCdcSubnet,
  } = service

  return {
    id,
    region,
    name,
    cidrBlock,
    isDefault,
    enableBroadcast,
    zone,
    routeTableId,
    createdTime,
    availableIpAddressCount,
    ipv6CidrBlock,
    networkAclId,
    isRemoteVpcSnat,
    totalIpAddressCount,
    cdcId,
    isCdcSubnet,
    tags: TagSet?.map(tagSet => ({
      id: cuid(),
      key: tagSet.Key,
      value: tagSet.Value,
    })),
  }
}
