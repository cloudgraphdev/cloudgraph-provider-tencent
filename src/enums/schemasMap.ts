import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.camPolicy]: 'tencentCamPolicy',
  [services.ccn]: 'tencentCcn',
  [services.ccnAttachment]: 'tencentCcnAttachment',
  [services.securityGroup]: 'tencentSecurityGroup',
  [services.securityGroupRule]: 'tencentSecurityGroupRule',
  [services.subnet]: 'tencentSubnet',
  [services.vpc]: 'tencentVpc',
  [services.vpnGateway]: 'tencentVpnGateway',
  tag: 'tencentTag',
}
