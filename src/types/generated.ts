export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type TencentBaseService = {
  id: Scalars['String'];
  region?: Maybe<Scalars['String']>;
};

export type TencentCamPolicy = TencentBaseService & {
  addTime?: Maybe<Scalars['String']>;
  attachEntityBoundaryCount?: Maybe<Scalars['Int']>;
  attachEntityCount?: Maybe<Scalars['Int']>;
  attachments?: Maybe<Scalars['Int']>;
  createMode?: Maybe<Scalars['Int']>;
  deactived?: Maybe<Scalars['Int']>;
  deactivedDetail?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  isAttached?: Maybe<Scalars['Int']>;
  isServiceLinkedPolicy?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  policyId?: Maybe<Scalars['Int']>;
  serviceType?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type TencentCamUser = TencentBaseService & {
  consoleLogin?: Maybe<Scalars['Int']>;
  countryCode?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  phoneNum?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  uin?: Maybe<Scalars['String']>;
};

export type TencentCcn = TencentBaseService & {
  bandwidthLimitType?: Maybe<Scalars['String']>;
  ccnAttachments?: Maybe<Array<Maybe<TencentCcnAttachment>>>;
  ccnDescription?: Maybe<Scalars['String']>;
  ccnId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  instanceChargeType?: Maybe<Scalars['String']>;
  instanceCount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  qosLevel?: Maybe<Scalars['String']>;
  routePriorityFlag?: Maybe<Scalars['Boolean']>;
  routeTableCount?: Maybe<Scalars['Int']>;
  routeTableFlag?: Maybe<Scalars['Boolean']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<TencentRawTag>>>;
};

export type TencentCcnAttachment = TencentBaseService & {
  attachedTime?: Maybe<Scalars['String']>;
  ccnUin?: Maybe<Scalars['String']>;
  ccns?: Maybe<Array<Maybe<TencentCcn>>>;
  cidrBlock?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  instanceArea?: Maybe<Scalars['String']>;
  instanceId?: Maybe<Scalars['String']>;
  instanceName?: Maybe<Scalars['String']>;
  instanceRegion?: Maybe<Scalars['String']>;
  instanceType?: Maybe<Scalars['String']>;
  instanceUin?: Maybe<Scalars['String']>;
  routeTableId?: Maybe<Scalars['String']>;
  routeTableName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type TencentCustomerGateway = TencentBaseService & {
  createdTime?: Maybe<Scalars['String']>;
  ipAddress?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<TencentRawTag>>>;
  vpnConnections?: Maybe<Array<Maybe<TencentVpnConnection>>>;
};

export type TencentKeyValue = {
  id: Scalars['String'];
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type TencentKubernetesCluster = TencentBaseService & {
  autoUpgradeClusterLevel?: Maybe<Scalars['Boolean']>;
  clusterDescription?: Maybe<Scalars['String']>;
  clusterLevel?: Maybe<Scalars['String']>;
  clusterMaterNodeNum?: Maybe<Scalars['Int']>;
  clusterNetworkSettings?: Maybe<TencentKubernetesClusterNetworkSettings>;
  clusterNodeNum?: Maybe<Scalars['Int']>;
  clusterOs?: Maybe<Scalars['String']>;
  clusterStatus?: Maybe<Scalars['String']>;
  clusterType?: Maybe<Scalars['String']>;
  clusterVersion?: Maybe<Scalars['String']>;
  containerRuntime?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  deletionProtection?: Maybe<Scalars['Boolean']>;
  enableExternalNode?: Maybe<Scalars['Boolean']>;
  imageId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  osCustomizeType?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['Int']>;
  property?: Maybe<Scalars['String']>;
  subnets?: Maybe<Array<Maybe<TencentSubnet>>>;
  tags?: Maybe<Array<Maybe<TencentRawTag>>>;
  vpcInstances?: Maybe<Array<Maybe<TencentVpc>>>;
};

export type TencentKubernetesClusterNetworkSettings = {
  clusterCIDR?: Maybe<Scalars['String']>;
  cni?: Maybe<Scalars['Boolean']>;
  ignoreClusterCIDRConflict?: Maybe<Scalars['Boolean']>;
  ipvs?: Maybe<Scalars['Boolean']>;
  kubeProxyMode?: Maybe<Scalars['String']>;
  maxClusterServiceNum?: Maybe<Scalars['Int']>;
  maxNodePodNum?: Maybe<Scalars['Int']>;
  serviceCIDR?: Maybe<Scalars['String']>;
  subnets?: Maybe<Array<Maybe<Scalars['String']>>>;
  vpcId?: Maybe<Scalars['String']>;
};

export type TencentNetworkAcl = TencentBaseService & {
  createdTime?: Maybe<Scalars['String']>;
  egressEntries?: Maybe<Array<Maybe<TencentNetworkAclEntry>>>;
  ingressEntries?: Maybe<Array<Maybe<TencentNetworkAclEntry>>>;
  name?: Maybe<Scalars['String']>;
  subnets?: Maybe<Array<Maybe<TencentSubnet>>>;
  vpcId?: Maybe<Scalars['String']>;
  vpcInstance?: Maybe<Array<Maybe<TencentVpc>>>;
};

export type TencentNetworkAclEntry = {
  action?: Maybe<Scalars['String']>;
  cidrBlock?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  ipv6CidrBlock?: Maybe<Scalars['String']>;
  modifyTime?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['String']>;
};

export type TencentRawTag = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TencentRouteTable = TencentBaseService & {
  associationSet?: Maybe<Array<Maybe<TencentRouteTableAssociation>>>;
  createdTime?: Maybe<Scalars['String']>;
  localCidrForCcn?: Maybe<Array<Maybe<TencentRouteTableLocalCidrForCcnn>>>;
  main?: Maybe<Scalars['Boolean']>;
  routeSet?: Maybe<Array<Maybe<TencentRouteTableRoute>>>;
  routeTableId?: Maybe<Scalars['String']>;
  routeTableName?: Maybe<Scalars['String']>;
  subnets?: Maybe<Array<Maybe<TencentSubnet>>>;
  tags?: Maybe<Array<Maybe<TencentRawTag>>>;
  vpcInstances?: Maybe<Array<Maybe<TencentVpc>>>;
};

export type TencentRouteTableAssociation = {
  id: Scalars['String'];
  routeTableId?: Maybe<Scalars['String']>;
  subnetId?: Maybe<Scalars['String']>;
};

export type TencentRouteTableLocalCidrForCcnn = {
  cidr?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  publishedToVbc?: Maybe<Scalars['Boolean']>;
};

export type TencentRouteTableRoute = {
  createdTime?: Maybe<Scalars['String']>;
  destinationCidrBlock?: Maybe<Scalars['String']>;
  destinationIpv6CidrBlock?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  gatewayId?: Maybe<Scalars['String']>;
  gatewayType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  publishedToVbc?: Maybe<Scalars['Boolean']>;
  routeDescription?: Maybe<Scalars['String']>;
  routeId?: Maybe<Scalars['Int']>;
  routeItemId?: Maybe<Scalars['String']>;
  routeTableId?: Maybe<Scalars['String']>;
  routeType?: Maybe<Scalars['String']>;
};

export type TencentSecurityGroup = TencentBaseService & {
  createdTime?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  securityGroupDesc?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<TencentRawTag>>>;
  updateTime?: Maybe<Scalars['String']>;
};

export type TencentSecurityGroupRule = TencentBaseService & {
  description?: Maybe<Scalars['String']>;
  destContent?: Maybe<Scalars['String']>;
  destType?: Maybe<Scalars['String']>;
  enable?: Maybe<Scalars['String']>;
  orderIndex?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['String']>;
  ruleAction?: Maybe<Scalars['String']>;
  serviceTemplateId?: Maybe<Scalars['String']>;
  sourceContent?: Maybe<Scalars['String']>;
  sourceType?: Maybe<Scalars['String']>;
};

export type TencentSubnet = TencentBaseService & {
  availableIpAddressCount?: Maybe<Scalars['Int']>;
  cdcId?: Maybe<Scalars['String']>;
  cidrBlock?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  enableBroadcast?: Maybe<Scalars['Boolean']>;
  ipv6CidrBlock?: Maybe<Scalars['String']>;
  isCdcSubnet?: Maybe<Scalars['Int']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  isRemoteVpcSnat?: Maybe<Scalars['Boolean']>;
  kubernetesClusters?: Maybe<Array<Maybe<TencentKubernetesCluster>>>;
  name?: Maybe<Scalars['String']>;
  networkAcl?: Maybe<Array<Maybe<TencentNetworkAcl>>>;
  networkAclId?: Maybe<Scalars['String']>;
  routeTableId?: Maybe<Scalars['String']>;
  routeTables?: Maybe<Array<Maybe<TencentRouteTable>>>;
  tags?: Maybe<Array<Maybe<TencentRawTag>>>;
  totalIpAddressCount?: Maybe<Scalars['Int']>;
  vpcInstances?: Maybe<Array<Maybe<TencentVpc>>>;
  zone?: Maybe<Scalars['String']>;
};

export type TencentTag = TencentBaseService & {
  key: Scalars['String'];
  securityGroups?: Maybe<Array<Maybe<TencentSecurityGroup>>>;
  subnets?: Maybe<Array<Maybe<TencentSubnet>>>;
  value: Scalars['String'];
  vpcInstances?: Maybe<Array<Maybe<TencentVpc>>>;
};

export type TencentVpc = TencentBaseService & {
  assistantCidrSet?: Maybe<Array<Maybe<TencentVpcAssistantCidr>>>;
  cidrBlock?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  dhcpOptionsId?: Maybe<Scalars['String']>;
  dnsServerSet?: Maybe<Array<Maybe<Scalars['String']>>>;
  domainName?: Maybe<Scalars['String']>;
  enableDhcp?: Maybe<Scalars['Boolean']>;
  enableMulticast?: Maybe<Scalars['Boolean']>;
  ipv6CidrBlock?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  kubernetesClusters?: Maybe<Array<Maybe<TencentKubernetesCluster>>>;
  name?: Maybe<Scalars['String']>;
  networkAcl?: Maybe<Array<Maybe<TencentNetworkAcl>>>;
  routeTables?: Maybe<Array<Maybe<TencentRouteTable>>>;
  subnets?: Maybe<Array<Maybe<TencentSubnet>>>;
  tags?: Maybe<Array<Maybe<TencentRawTag>>>;
  vpnGateways?: Maybe<Array<Maybe<TencentVpnGateway>>>;
};

export type TencentVpcAssistantCidr = {
  assistantType?: Maybe<Scalars['Int']>;
  cidrBlock?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  subnetSet?: Maybe<Array<Maybe<TencentSubnet>>>;
  vpcId?: Maybe<Scalars['String']>;
};

export type TencentVpnConnection = TencentBaseService & {
  createdTime?: Maybe<Scalars['String']>;
  customerGateways?: Maybe<Array<Maybe<TencentCustomerGateway>>>;
  enableHealthCheck?: Maybe<Scalars['Boolean']>;
  encryptProto?: Maybe<Scalars['String']>;
  healthCheckLocalIp?: Maybe<Scalars['String']>;
  healthCheckRemoteIp?: Maybe<Scalars['String']>;
  healthCheckStatus?: Maybe<Scalars['String']>;
  ikeOptionsSpecification?: Maybe<TencentVpnConnectionIkeOptionsSpecification>;
  ipsecOptionsSpecification?: Maybe<TencentVpnConnectionIpsecOptionsSpecification>;
  name?: Maybe<Scalars['String']>;
  netStatus?: Maybe<Scalars['String']>;
  preShareKey?: Maybe<Scalars['String']>;
  routeType?: Maybe<Scalars['String']>;
  securityPolicyDatabaseSet?: Maybe<Array<Maybe<TencentVpnConnectionSecurityPolicyDatabase>>>;
  state?: Maybe<Scalars['String']>;
  vpnGateways?: Maybe<Array<Maybe<TencentVpnGateway>>>;
  vpnProto?: Maybe<Scalars['String']>;
};

export type TencentVpnConnectionIkeOptionsSpecification = {
  dhGroupName?: Maybe<Scalars['String']>;
  exchangeMode?: Maybe<Scalars['String']>;
  ikeSaLifetimeSeconds?: Maybe<Scalars['Int']>;
  ikeVersion?: Maybe<Scalars['String']>;
  localAddress?: Maybe<Scalars['String']>;
  localFqdnName?: Maybe<Scalars['String']>;
  localIdentity?: Maybe<Scalars['String']>;
  propoAuthenAlgorithm?: Maybe<Scalars['String']>;
  propoEncryAlgorithm?: Maybe<Scalars['String']>;
  remoteAddress?: Maybe<Scalars['String']>;
  remoteFqdnName?: Maybe<Scalars['String']>;
  remoteIdentity?: Maybe<Scalars['String']>;
};

export type TencentVpnConnectionIpsecOptionsSpecification = {
  encryptAlgorithm?: Maybe<Scalars['String']>;
  integrityAlgorith?: Maybe<Scalars['String']>;
  ipsecSaLifetimeSeconds?: Maybe<Scalars['Int']>;
  ipsecSaLifetimeTraffic?: Maybe<Scalars['Int']>;
  pfsDhGroup?: Maybe<Scalars['String']>;
};

export type TencentVpnConnectionSecurityPolicyDatabase = {
  bandwidth?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  localCidrBlock?: Maybe<Scalars['String']>;
  remoteCidrBlock?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type TencentVpnGateway = TencentBaseService & {
  cdcId?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  expiredTime?: Maybe<Scalars['String']>;
  instanceChargeType?: Maybe<Scalars['String']>;
  internetMaxBandwidthOut?: Maybe<Scalars['Int']>;
  isAddressBlocked?: Maybe<Scalars['Boolean']>;
  maxConnection?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  networkInstanceId?: Maybe<Scalars['String']>;
  newPurchasePlan?: Maybe<Scalars['String']>;
  publicIpAddress?: Maybe<Scalars['String']>;
  renewFlag?: Maybe<Scalars['String']>;
  restrictState?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  vpcInstances?: Maybe<Array<Maybe<TencentVpc>>>;
  vpnConnections?: Maybe<Array<Maybe<TencentVpnConnection>>>;
  vpnGatewayQuotaSet?: Maybe<Array<Maybe<TencentVpnGatewayQuota>>>;
  vpnGatewayRoutes?: Maybe<Array<Maybe<TencentVpnGatewayRoute>>>;
  zone?: Maybe<Scalars['String']>;
};

export type TencentVpnGatewayQuota = {
  bandwidth?: Maybe<Scalars['Int']>;
  cname?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type TencentVpnGatewayRoute = TencentBaseService & {
  createTime?: Maybe<Scalars['String']>;
  destinationCidrBlock?: Maybe<Scalars['String']>;
  instanceId?: Maybe<Scalars['String']>;
  instanceType?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  vpnGateways?: Maybe<Array<Maybe<TencentVpnGateway>>>;
};
