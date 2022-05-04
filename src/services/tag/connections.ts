import { ServiceConnection } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import services from '../../enums/services'
import aliases from '../../enums/serviceAliases'

export default ({
  service,
  data,
  region,
}: {
  service: any
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []
  const connectTo = Object.values(services)

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)

    if (instances?.data?.[region]) {
      const filtered = instances.data[region].filter(
        ({ TagSet }: rawDataInterface) => !!TagSet
      )

      for (const instance of filtered) {
        if (instance) {
          connections.push({
            id: instance.id,
            resourceType: serviceName,
            relation: 'child',
            field:  aliases[serviceName] ? aliases[serviceName] : serviceName,
          })
        }
      }
    }
  }
  
  const tagResult = {
    [id]: connections,
  }
  return tagResult
}
