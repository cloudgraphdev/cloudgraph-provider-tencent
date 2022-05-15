import cuid from 'cuid'
import { TencentVpnGateway } from '../../types/generated'
import { RawTencentVpnGateway } from './data'

export default ({
  service,
  region,
}: {
  service: RawTencentVpnGateway
  region: string
}): TencentVpnGateway=> {
  const {
    id,
    VpnGatewayName: name,
    Type: type,
    State: state,
    PublicIpAddress: publicIpAddress,
    RenewFlag: renewFlag,
    InstanceChargeType: instanceChargeType,
    InternetMaxBandwidthOut: internetMaxBandwidthOut,
    CreatedTime: createdTime,
    ExpiredTime: expiredTime,
    IsAddressBlocked: isAddressBlocked,
    NewPurchasePlan: newPurchasePlan,
    RestrictState: restrictState,
    Zone: zone,
    VpnGatewayQuotaSet,
    Version: version,
    NetworkInstanceId: networkInstanceId,
    CdcId: cdcId,
    MaxConnection: maxConnection,
  } = service

  return {
    id,
    region,
    name,
    type,
    state,
    publicIpAddress,
    renewFlag,
    instanceChargeType,
    internetMaxBandwidthOut,
    createdTime,
    expiredTime,
    isAddressBlocked,
    newPurchasePlan,
    restrictState,
    zone,
    vpnGatewayQuotaSet: VpnGatewayQuotaSet.map(({
      Bandwidth: bandwidth,
      Cname: chineseName,
      Name: englishName,
    }) => {
      return {
        id: cuid(),
        bandwidth,
        cname: chineseName,
        name: englishName,
      }
    }),
    version,
    networkInstanceId,
    cdcId,
    maxConnection,
  }
}
