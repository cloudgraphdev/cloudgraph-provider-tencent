import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.subnet]: 'tencentSubnet',
  [services.vpc]: 'tencentVpc',
  [services.vpnGateway]: 'tencentVpnGateway',
  tag: 'tencentTag',
}
