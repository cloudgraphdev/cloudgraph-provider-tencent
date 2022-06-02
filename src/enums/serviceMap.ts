import services from './services'
import TencentNetworkAcl from '../services/networkAcl'
import TencentSecurityGroup from '../services/securityGroup'
import TencentSecurityGroupRule from '../services/securityGroupRule'
import TencentCcn from '../services/ccn'
import TencentCcnAttachment from '../services/ccnAttachment'
import TencentSubnet from '../services/subnet'
import TencentVpc from '../services/vpc'
import TencentTag from '../services/tag'
import TencentRouteTable from '../services/routeTable'
import TencentVpnGateway from '../services/vpnGateway'
import TencentCamPolicy from '../services/camPolicy'
import TencentVpnGatewayRoute from '../services/vpnGatewayRoute'
import TencentCustomerGateway from '../services/customerGateway'
import TencentVpnConnection from '../services/vpnConnection'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.camPolicy]: TencentCamPolicy,
  [services.ccn]: TencentCcn,
  [services.ccnAttachment]: TencentCcnAttachment,
  [services.customerGateway]: TencentCustomerGateway,
  [services.networkAcl]: TencentNetworkAcl,
  [services.routeTable]: TencentRouteTable,
  [services.securityGroup]: TencentSecurityGroup,
  [services.securityGroupRule]: TencentSecurityGroupRule,
  [services.subnet]: TencentSubnet,
  [services.vpc]: TencentVpc,
  [services.vpnConnection]: TencentVpnConnection,
  [services.vpnGateway]: TencentVpnGateway,
  [services.vpnGatewayRoute]: TencentVpnGatewayRoute,
  tag: TencentTag,
}
