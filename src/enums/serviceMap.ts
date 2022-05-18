import services from './services'
import TencentSecurityGroup from '../services/securityGroup'
import TencentSecurityGroupRule from '../services/securityGroupRule'
import TencentCcn from '../services/ccn'
import TencentCcnAttachment from '../services/ccnAttachment'
import TencentSubnet from '../services/subnet'
import TencentVpc from '../services/vpc'
import TencentTag from '../services/tag'
import TencentRouteTable from '../services/routeTable'
import TencentVpnGateway from '../services/vpnGateway'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.routeTable]: TencentRouteTable,
  [services.securityGroup]: TencentSecurityGroup,
  [services.securityGroupRule]: TencentSecurityGroupRule,
  [services.ccn]: TencentCcn,
  [services.ccnAttachment]: TencentCcnAttachment,
  [services.subnet]: TencentSubnet,
  [services.vpc]: TencentVpc,
  [services.vpnGateway]: TencentVpnGateway,
  tag: TencentTag,
}
