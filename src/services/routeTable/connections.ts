import { ServiceConnection } from '@cloudgraph/sdk'
import { RawTencentRouteTable } from './data'
import services from '../../enums/services'
import aliases from '../../enums/serviceAliases'

export default ({
  service,
  data,
  region,
}: {
  service: RawTencentRouteTable
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []

  const subnetSets = service.AssociationSet.map(({SubnetId}) => SubnetId)

  const instances: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.subnet)

  if (instances?.data?.[region]) {
    for (const service of instances.data[region]) {
      if (subnetSets.includes(service.id)) {
        connections.push({
          id: service.id,
          resourceType: services.subnet,
          relation: 'child',
          field: aliases[services.subnet]
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
