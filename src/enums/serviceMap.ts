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
import TencentVpnGatewayRoute from '../services/vpnGatewayRoute'
import TencentCustomerGateway from '../services/customerGateway'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.customerGateway]: TencentCustomerGateway,
  [services.routeTable]: TencentRouteTable,
  [services.securityGroup]: TencentSecurityGroup,
  [services.securityGroupRule]: TencentSecurityGroupRule,
  [services.ccn]: TencentCcn,
  [services.ccnAttachment]: TencentCcnAttachment,
  [services.securityGroup]: TencentSecurityGroup,
  [services.securityGroupRule]: TencentSecurityGroupRule,
  [services.subnet]: TencentSubnet,
  [services.vpc]: TencentVpc,
  [services.vpnGateway]: TencentVpnGateway,
  [services.vpnGatewayRoute]: TencentVpnGatewayRoute,
  tag: TencentTag,
}
