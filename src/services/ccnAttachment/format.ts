import { TencentCcnAttachment } from '../../types/generated'
import { RawTencentCcnAttachment } from './data'

export default ({
  service,
  region,
}: {
  service: RawTencentCcnAttachment
  region: string
}): TencentCcnAttachment => {
  const {
    id,
    InstanceType: instanceType,
    InstanceId: instanceId,
    InstanceName: instanceName,
    InstanceRegion: instanceRegion,
    InstanceUin: instanceUin,
    CidrBlock: cidrBlock,
    State: state,
    AttachedTime: attachedTime,
    CcnUin: ccnUin,
    InstanceArea: instanceArea,
    Description: description,
    RouteTableId: routeTableId,
    RouteTableName: routeTableName,
  } = service

  return {
    id,
    region,
    instanceType,
    instanceId,
    instanceName,
    instanceRegion,
    instanceUin,
    cidrBlock,
    state,
    attachedTime,
    ccnUin,
    instanceArea,
    description,
    routeTableId,
    routeTableName,
  }
}
