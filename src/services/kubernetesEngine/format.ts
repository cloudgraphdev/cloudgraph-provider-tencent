import cuid from 'cuid'
import { TencentKubernetesCluster } from '../../types/generated'
import { RawTencentKubernetesEngine } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawTencentKubernetesEngine
  account: string
  region: string
}): TencentKubernetesCluster => {
  const {
    id,
    ClusterName: name,
    ClusterDescription: clusterDescription,
    ClusterVersion: clusterVersion,
    ClusterOs: clusterOs,
    ClusterType: clusterType,
    ClusterNetworkSettings,
    ClusterNodeNum: clusterNodeNum,
    ProjectId: projectId,
    TagSpecification,
    ClusterStatus: clusterStatus,
    Property: property,
    ClusterMaterNodeNum: clusterMaterNodeNum,
    ImageId: imageId,
    OsCustomizeType: osCustomizeType,
    ContainerRuntime: containerRuntime,
    CreatedTime: createdTime,
    DeletionProtection: deletionProtection,
    EnableExternalNode: enableExternalNode,
    ClusterLevel: clusterLevel,
    AutoUpgradeClusterLevel: autoUpgradeClusterLevel,
  } = service

  const Tags = []
  TagSpecification?.map(spec => {
    Tags.push(spec.Tags)
  })

  return {
    id,
    region,
    name,
    clusterDescription,
    clusterVersion,
    clusterOs,
    clusterType,
    clusterNetworkSettings: {
      clusterCIDR: ClusterNetworkSettings?.ClusterCIDR,
      ignoreClusterCIDRConflict: ClusterNetworkSettings?.IgnoreClusterCIDRConflict,
      maxNodePodNum: ClusterNetworkSettings?.MaxNodePodNum,
      maxClusterServiceNum: ClusterNetworkSettings?.MaxClusterServiceNum,
      ipvs: ClusterNetworkSettings?.Ipvs,
      vpcId: ClusterNetworkSettings?.VpcId,
      cni: ClusterNetworkSettings?.Cni,
      kubeProxyMode: ClusterNetworkSettings?.KubeProxyMode,
      serviceCIDR: ClusterNetworkSettings?.ServiceCIDR,
      subnets: ClusterNetworkSettings?.Subnets,
    },
    clusterNodeNum,
    projectId,
    tags: Tags.map(tag => ({
      id: cuid(),
      key: tag.Key,
      value: tag.Value,
    })),
    clusterStatus,
    property,
    clusterMaterNodeNum,
    imageId,
    osCustomizeType,
    containerRuntime,
    createdTime,
    deletionProtection,
    enableExternalNode,
    clusterLevel,
    autoUpgradeClusterLevel,
  }
}
