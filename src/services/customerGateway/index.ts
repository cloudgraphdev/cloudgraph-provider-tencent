import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import format from './format'
import getData from './data'
import { getMutation } from '../../utils'
import services from '../../enums/services'
import schemasMap from '../../enums/schemasMap'

export default class TencentCustomerGateway extends BaseService implements Service {
  format = format.bind(this)

  getData = getData.bind(this)

  mutation = getMutation(schemasMap[services.customerGateway])
}
