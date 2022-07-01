import {Service} from '@cloudgraph/sdk'
import BaseService from '../base'
import format from './format'
import getData from './data'
import getConnections from './connections'
import { getMutation } from '../../utils'
import services from '../../enums/services'
import schemasMap from '../../enums/schemasMap'

export default class TencentSubnet extends BaseService implements Service {
  format = format.bind(this)

  getData = getData.bind(this)

  getConnections = getConnections.bind(this)

  mutation = getMutation(schemasMap[services.subnet])
}
