import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import format from './format'
import getData, { serviceName } from './data'
import { getMutation } from '../../utils'

export default class TencentVpnGateway extends BaseService implements Service {
  format = format.bind(this)

  getData = getData.bind(this)

  mutation = getMutation(serviceName)
}
