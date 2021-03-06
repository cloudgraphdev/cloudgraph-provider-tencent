import { ServiceConnection } from '@cloudgraph/sdk'
import { RawTencentVpc } from './data'
import services from '../../enums/services'
import aliases from '../../enums/serviceAliases'

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawTencentVpc
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []
  const connectTo = Object.values(services).filter(
    service => service !== services.vpc
  )

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)

    if (instances?.data?.[region]) {
      for (const service of instances.data[region]) {
        if (id === service.VpcId) {
          connections.push({
            id: service.id,
            resourceType: serviceName,
            relation: 'child',
            field: aliases[serviceName] ? aliases[serviceName] : serviceName,
          })
        }
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
