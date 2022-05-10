import services from './services'
import TencentSecurityGroup from '../services/securityGroup'
import TencentSubnet from '../services/subnet'
import TencentVpc from '../services/vpc'
import TencentTag from '../services/tag'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.securityGroup]: TencentSecurityGroup,
  [services.subnet]: TencentSubnet,
  [services.vpc]: TencentVpc,
  tag: TencentTag,
}
