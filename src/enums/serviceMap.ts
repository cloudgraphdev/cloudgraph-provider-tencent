import services from './services'
import TencentSubnet from '../services/subnet'
import TencentVpc from '../services/vpc'
import TencentTag from '../services/tag'
import TencentVpnGateway from '../services/vpnGateway'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.subnet]: TencentSubnet,
  [services.vpc]: TencentVpc,
  [services.vpnGateway]: TencentVpnGateway,
  tag: TencentTag,
}
