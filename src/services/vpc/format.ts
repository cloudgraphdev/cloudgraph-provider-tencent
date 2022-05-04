import cuid from 'cuid'
import { TencentVpc } from '../../types/generated'
import { RawTencentVpc } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawTencentVpc
  account: string
  region: string
}): TencentVpc => {
  const {
    id,
    VpcName: name,
    CidrBlock: cidrBlock,
    IsDefault: isDefault,
    EnableMulticast: enableMulticast,
    CreatedTime: createdTime,
    DnsServerSet: dnsServerSet,
    DomainName: domainName,
    DhcpOptionsId: dhcpOptionsId,
    EnableDhcp: enableDhcp,
    Ipv6CidrBlock: ipv6CidrBlock,
    AssistantCidrSet,
    TagSet,
  } = service

  return {
    id,
    region,
    name,
    cidrBlock,
    isDefault,
    enableMulticast,
    createdTime,
    dnsServerSet,
    domainName,
    dhcpOptionsId,
    enableDhcp,
    ipv6CidrBlock,
    assistantCidrSet: AssistantCidrSet?.map(assistantCidr => ({
      id: cuid(),
      ...assistantCidr,
    })),
    tags: TagSet?.map(tagSet => ({
      id: cuid(),
      key: tagSet.Key,
      value: tagSet.Value,
    })),
  }
}
