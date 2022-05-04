import services from './services'
import TencentSubnet from '../services/subnet'
import TencentVpc from '../services/vpc'
import TencentTag from '../services/tag'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.subnet]: TencentSubnet,
  [services.vpc]: TencentVpc,
  tag: TencentTag,
}
