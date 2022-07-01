import { ServiceConnection } from '@cloudgraph/sdk'
import { RawTencentVpnGateway } from './data'
import services from '../../enums/services'
import aliases from '../../enums/serviceAliases'
import { RawTencentVpnGatewayRoute } from '../vpnGatewayRoute/data'

const serviceName = services.vpnGatewayRoute

export default ({
  service,
  data,
  region,
}: {
  service: RawTencentVpnGateway
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []

  const vpnGatewayRouteInstances: {
    name: string
    data: { [region: string]: RawTencentVpnGatewayRoute[] }
  } = data.find(({ name }) => name === services.vpnGatewayRoute)
  if (vpnGatewayRouteInstances?.data?.[region]) {
    for (const vpnGatewayRouteInstanceInstance of vpnGatewayRouteInstances.data[region]) {
      if (id === vpnGatewayRouteInstanceInstance.vpnGatewayId) {
        connections.push({
          id: vpnGatewayRouteInstanceInstance.id,
          resourceType: serviceName,
          relation: 'child',
          field: aliases[serviceName] ? aliases[serviceName] : serviceName,
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
