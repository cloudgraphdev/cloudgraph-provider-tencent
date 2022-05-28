import { ServiceConnection } from '@cloudgraph/sdk'
import { RawTencentVpnConnection } from './data'
import services from '../../enums/services'
import aliases from '../../enums/serviceAliases'
import { RawTencentVpnGateway } from '../vpnGateway/data'
import { RawTencentCustomerGateway } from '../customerGateway/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawTencentVpnConnection
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []

  const vpnGatewayId = service.VpnGatewayId
  const vpnGatewayInstances = data.find(({ name }) => name === services.vpnGateway)

  if (vpnGatewayInstances?.data?.[region]) {
    const instance: RawTencentVpnGateway = vpnGatewayInstances.data[region].find(({id: serviceId}) => serviceId === vpnGatewayId)
    connections.push({
      id: instance.id,
      resourceType: services.vpnGateway,
      relation: 'child',
      field: aliases[services.vpnGateway]
    })
  }

  const customerGatewayId = service.CustomerGatewayId
  const customerGatewayInstances = data.find(({ name }) => name === services.customerGateway)

  if (customerGatewayInstances?.data?.[region]) {
    const instance: RawTencentCustomerGateway = customerGatewayInstances.data[region]
      .find(({id: serviceId}) => serviceId === customerGatewayId)
    connections.push({
      id: instance.id,
      resourceType: services.customerGateway,
      relation: 'child',
      field: aliases[services.customerGateway]
    })
  }

  const result = {
    [id]: connections,
  }
  return result
}
