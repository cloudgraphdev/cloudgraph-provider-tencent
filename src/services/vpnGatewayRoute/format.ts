import { TencentVpnGatewayRoute } from '../../types/generated'
import { RawTencentVpnGatewayRoute } from './data'

export default ({
  service,
  region,
}: {
  service: RawTencentVpnGatewayRoute
  region: string
}): TencentVpnGatewayRoute => {
  const {
    id,
    DestinationCidrBlock: destinationCidrBlock,
    InstanceType: instanceType,
    InstanceId: instanceId,
    Priority: priority,
    Status: status,
    Type: type,
    CreateTime: createTime,
    UpdateTime: updateTime,
  } = service

  return {
    id,
    region,
    destinationCidrBlock,
    instanceType,
    instanceId,
    priority,
    status,
    type,
    createTime,
    updateTime,
  }
}
