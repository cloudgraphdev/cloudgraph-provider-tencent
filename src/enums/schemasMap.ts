import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.ccn]: 'tencentCcn',
  [services.ccnAttachment]: 'tencentCcnAttachment',
  [services.subnet]: 'tencentSubnet',
  [services.vpc]: 'tencentVpc',
  tag: 'tencentTag',
}
