import { Service } from '@cloudgraph/sdk';
import BaseService from '../base';
import getConnections from './connections';
import getData, { serviceName } from './data'
import { getMutation } from '../../utils'

export default class TencentTag extends BaseService implements Service {
  format = ({service}: {service: any}): any => service

  getConnections = getConnections.bind(this)

  getData = getData.bind(this)

  mutation = getMutation(serviceName)
}
