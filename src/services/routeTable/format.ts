import cuid from 'cuid'
import { Route } from 'tencentcloud-sdk-nodejs/tencentcloud/services/vpc/v20170312/vpc_models'
import { TencentRouteTable, TencentRouteTableRoute } from '../../types/generated'
import { formatTagSet } from '../../utils/format'
import { RawTencentRouteTable } from './data'

const formatRouteTableRoute = (route: Route): TencentRouteTableRoute => {
  const {
    DestinationCidrBlock: destinationCidrBlock,
    GatewayType: gatewayType,
    GatewayId: gatewayId,
    RouteId: routeId = 0,
    RouteDescription: routeDescription = '',
    Enabled: enabled = false,
    RouteType: routeType = '',
    RouteTableId: routeTableId = '',
    DestinationIpv6CidrBlock: destinationIpv6CidrBlock = '',
    RouteItemId: routeItemId = '',
    PublishedToVbc: publishedToVbc = false,
    CreatedTime: createdTime = '',
  } = route

  return {
    id: cuid(),
    destinationCidrBlock,
    gatewayType,
    gatewayId,
    routeId,
    routeDescription,
    enabled,
    routeType,
    routeTableId,
    destinationIpv6CidrBlock,
    routeItemId,
    publishedToVbc,
    createdTime,
  }
}


export default ({
  service,
  region,
}: {
  service: RawTencentRouteTable
  region: string
}): TencentRouteTable=> {
  const {
    id,
    RouteTableId: routeTableId,
    RouteTableName: routeTableName,
    AssociationSet = [],
    RouteSet = [],
    Main: main,
    CreatedTime: createdTime = '',
    TagSet,
    LocalCidrForCcn = [],
  } = service

  return {
    id,
    region,
    routeTableId,
    routeTableName,
    associationSet: AssociationSet.map(({SubnetId: subnetId, RouteTableId: associationRouteTableId}) => {
      return {
        id: cuid(),
        subnetId,
        routeTableId: associationRouteTableId,
      }
    }),
    routeSet: RouteSet.map(formatRouteTableRoute),
    main,
    createdTime,
    tags: formatTagSet(TagSet),
    localCidrForCcn: LocalCidrForCcn.map(({Cidr: cidr, PublishedToVbc: publishedToVbc}) => {
      return {
        id: cuid(),
        cidr,
        publishedToVbc,
      }
    })
  }
}
