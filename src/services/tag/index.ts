import { Service } from '@cloudgraph/sdk';
import BaseService from '../base';
import getConnections from './connections';
import getData from './data'
import { getMutation } from '../../utils'
import services from '../../enums/services'
import schemasMap from '../../enums/schemasMap'

export default class TencentTag extends BaseService implements Service {
  format = ({service}: {service: any}): any => service

  getConnections = getConnections.bind(this)

  getData = getData.bind(this)

  mutation = getMutation(schemasMap[services.tag])
}
