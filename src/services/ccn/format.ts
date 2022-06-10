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
    CcnId: ccnId,
    CcnName: name,
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
    ccnId,
    name,
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
