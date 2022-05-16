import { TencentCcn } from '../../types/generated'
import { formatTagSet } from '../../utils/format'
import { RawTencentCcn } from './data'

export default ({
  service,
  region,
}: {
  service: RawTencentCcn
  region: string
}): TencentCcn => {
  const {
    id,
    CcnName: ccnName,
    CcnDescription: ccnDescription,
    InstanceCount: instanceCount,
    CreateTime: createTime,
    State: state,
    QosLevel: qosLevel,
    InstanceChargeType: instanceChargeType,
    BandwidthLimitType: bandwidthLimitType,
    TagSet,
    RoutePriorityFlag: routePriorityFlag,
    RouteTableCount: routeTableCount,
    RouteTableFlag: routeTableFlag,
  } = service

  return {
    id,
    region,
    ccnName,
    ccnDescription,
    instanceCount,
    createTime,
    state,
    qosLevel,
    instanceChargeType,
    bandwidthLimitType,
    tags: formatTagSet(TagSet),
    routePriorityFlag,
    routeTableCount,
    routeTableFlag,
  }
}
