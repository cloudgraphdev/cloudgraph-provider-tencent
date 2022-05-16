import { ServiceConnection } from '@cloudgraph/sdk'
import { RawTencentCcn } from './data'
import services from '../../enums/services'
import aliases from '../../enums/serviceAliases'

const serviceName = 'ccn'

export default ({
  service,
  data,
  region,
}: {
  service: RawTencentCcn
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []

  const instances: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.ccnAttachment)

  if (instances?.data?.[region]) {
    for (const service of instances.data[region]) {
      if (id === service.CcnId) {
        connections.push({
          id: service.id,
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
