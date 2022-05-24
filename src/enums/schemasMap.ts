import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.customerGateway]: 'tencentCustomerGateway',
  [services.routeTable]: 'tencentRouteTable',
  [services.securityGroup]: 'tencentSecurityGroup',
  [services.securityGroupRule]: 'tencentSecurityGroupRule',
  [services.ccn]: 'tencentCcn',
  [services.ccnAttachment]: 'tencentCcnAttachment',
  [services.subnet]: 'tencentSubnet',
  [services.vpc]: 'tencentVpc',
  [services.vpnGateway]: 'tencentVpnGateway',
  [services.vpnGatewayRoute]: 'tencentVpnGatewayRoute',
  tag: 'tencentTag',
}
