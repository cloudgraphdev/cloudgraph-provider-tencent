import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.camGroup]: 'tencentCamGroup',
  [services.camPolicy]: 'tencentCamPolicy',
  [services.camUser]: 'tencentCamUser',
  [services.ccn]: 'tencentCcn',
  [services.ccnAttachment]: 'tencentCcnAttachment',
  [services.customerGateway]: 'tencentCustomerGateway',
  [services.networkAcl]: 'tencentNetworkAcl',
  [services.routeTable]: 'tencentRouteTable',
  [services.securityGroup]: 'tencentSecurityGroup',
  [services.securityGroupRule]: 'tencentSecurityGroupRule',
  [services.kubernetesEngine]: 'tencentKubernetesCluster',
  [services.subnet]: 'tencentSubnet',
  [services.vpc]: 'tencentVpc',
  [services.vpnConnection]: 'tencentVpnConnection',
  [services.vpnGateway]: 'tencentVpnGateway',
  [services.vpnGatewayRoute]: 'tencentVpnGatewayRoute',
  tag: 'tencentTag',
}
