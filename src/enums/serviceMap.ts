import services from './services'
import TencentSecurityGroup from '../services/securityGroup'
import TencentSecurityGroupRule from '../services/securityGroupRule'
import TencentCcn from '../services/ccn'
import TencentCcnAttachment from '../services/ccnAttachment'
import TencentSubnet from '../services/subnet'
import TencentVpc from '../services/vpc'
import TencentTag from '../services/tag'
import TencentVpnGateway from '../services/vpnGateway'
import TencentVpnGatewayRoute from '../services/vpnGatewayRoute'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.securityGroup]: TencentSecurityGroup,
  [services.securityGroupRule]: TencentSecurityGroupRule,
  [services.ccn]: TencentCcn,
  [services.ccnAttachment]: TencentCcnAttachment,
  [services.subnet]: TencentSubnet,
  [services.vpc]: TencentVpc,
  [services.vpnGateway]: TencentVpnGateway,
  [services.vpnGatewayRoute]: TencentVpnGatewayRoute,
  tag: TencentTag,
}
