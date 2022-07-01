import { TencentSecurityGroupRule } from '../../types/generated'
import { RawTencentSecurityGroupRule } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawTencentSecurityGroupRule
  account: string
  region: string
}): TencentSecurityGroupRule => {
  const {
    id,
    SourceContent: sourceContent,
    SourceType: sourceType,
    DestContent: destContent,
    DestType: destType,
    RuleAction: ruleAction,
    Description: description,
    OrderIndex: orderIndex,
    Protocol: protocol,
    Port: port,
    ServiceTemplateId: serviceTemplateId,
    Enable: enable,
  } = service

  return {
    id,
    region,
    sourceContent,
    sourceType,
    destContent,
    destType,
    ruleAction,
    description,
    orderIndex,
    protocol,
    port,
    serviceTemplateId,
    enable,
  }
}
