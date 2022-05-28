import cuid from 'cuid'
import {
  IKEOptionsSpecification,
  IPSECOptionsSpecification,
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models';
import {
  TencentVpnConnection,
  TencentVpnConnectionIkeOptionsSpecification,
  TencentVpnConnectionIpsecOptionsSpecification,
} from '../../types/generated'
import { RawTencentVpnConnection } from './data'

const formatIKEOptionsSpecification = (ikeOptionsSpecification: IKEOptionsSpecification): TencentVpnConnectionIkeOptionsSpecification => {
  const {
    PropoEncryAlgorithm: propoEncryAlgorithm = '',
    PropoAuthenAlgorithm: propoAuthenAlgorithm = '',
    ExchangeMode: exchangeMode = '',
    LocalIdentity: localIdentity = '',
    RemoteIdentity: remoteIdentity = '',
    LocalAddress: localAddress = '',
    RemoteAddress: remoteAddress = '',
    LocalFqdnName: localFqdnName = '',
    RemoteFqdnName: remoteFqdnName = '',
    DhGroupName: dhGroupName = '',
    IKESaLifetimeSeconds: ikeSaLifetimeSeconds = 0,
    IKEVersion: ikeVersion = '',
  } = ikeOptionsSpecification

  return {
    propoEncryAlgorithm,
    propoAuthenAlgorithm,
    exchangeMode,
    localIdentity,
    remoteIdentity,
    localAddress,
    remoteAddress,
    localFqdnName,
    remoteFqdnName,
    dhGroupName,
    ikeSaLifetimeSeconds,
    ikeVersion,
  }
}

const formatIPSECOptionsSpecification = (
  ipsecOptionsSpecification: IPSECOptionsSpecification,
): TencentVpnConnectionIpsecOptionsSpecification => {
  const {
    EncryptAlgorithm: encryptAlgorithm = '',
    IntegrityAlgorith: integrityAlgorith = '',
    IPSECSaLifetimeSeconds: ipsecSaLifetimeSeconds = 0,
    PfsDhGroup: pfsDhGroup = '',
    IPSECSaLifetimeTraffic: ipsecSaLifetimeTraffic = 0,
  } = ipsecOptionsSpecification

  return {
    encryptAlgorithm,
    integrityAlgorith,
    ipsecSaLifetimeSeconds,
    pfsDhGroup,
    ipsecSaLifetimeTraffic,
  }
}

export default ({
  service,
  region,
}: {
  service: RawTencentVpnConnection
  region: string
}): TencentVpnConnection=> {
  const {
    id,
    VpnConnectionName: name,
    PreShareKey: preShareKey,
    VpnProto: vpnProto,
    EncryptProto: encryptProto,
    RouteType: routeType,
    CreatedTime: createdTime,
    State: state,
    NetStatus: netStatus,
    SecurityPolicyDatabaseSet = [],
    IKEOptionsSpecification: ikeOptionsSpecification = {},
    IPSECOptionsSpecification: ipsecOptionsSpecification = {},
    EnableHealthCheck: enableHealthCheck,
    HealthCheckLocalIp: healthCheckLocalIp,
    HealthCheckRemoteIp: healthCheckRemoteIp,
    HealthCheckStatus: healthCheckStatus,
  } = service

  return {
    id,
    region,
    name,
    preShareKey,
    vpnProto,
    encryptProto,
    routeType,
    createdTime,
    state,
    netStatus,
    securityPolicyDatabaseSet: SecurityPolicyDatabaseSet.map(({
      LocalCidrBlock: localCidrBlock,
      RemoteCidrBlock: remoteCidrBlock,
    }) => {
      return {
        id: cuid(),
        localCidrBlock,
        remoteCidrBlock,
      }
    }),
    ikeOptionsSpecification: formatIKEOptionsSpecification(ikeOptionsSpecification),
    ipsecOptionsSpecification: formatIPSECOptionsSpecification(ipsecOptionsSpecification),
    enableHealthCheck,
    healthCheckLocalIp,
    healthCheckRemoteIp,
    healthCheckStatus,
  }
}
