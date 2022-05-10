import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.routeTable]: 'tencentRouteTable',
  [services.subnet]: 'tencentSubnet',
  [services.vpc]: 'tencentVpc',
  tag: 'tencentTag',
}
