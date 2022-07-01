import { ServiceConnection } from '@cloudgraph/sdk'
import { RawTencentCcn } from './data'
import services from '../../enums/services'
import aliases from '../../enums/serviceAliases'

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
  const { id, CcnId } = service
  const connections: ServiceConnection[] = []

  const instances: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.ccnAttachment)

  if (instances?.data?.[region]) {
    for (const service of instances.data[region]) {
      if (CcnId === service.CcnId) {
        connections.push({
          id: service.id,
          resourceType: services.ccnAttachment,
          relation: 'child',
          field: aliases[services.ccnAttachment] ? aliases[services.ccnAttachment] : services.ccnAttachment,
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
