import {Service} from '@cloudgraph/sdk'
import BaseService from '../base'
import format from './format'
import getData, { serviceName } from './data'
import getConnections from './connections'
import { getMutation } from '../../utils'

export default class TencentCcn extends BaseService implements Service {
  format = format.bind(this)

  getData = getData.bind(this)

  getConnections = getConnections.bind(this)

  mutation = getMutation(serviceName)
}
