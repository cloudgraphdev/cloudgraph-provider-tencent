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

export type TencentKeyValue = {
  id: Scalars['String'];
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type TencentRawTag = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
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
  name?: Maybe<Scalars['String']>;
  networkAclId?: Maybe<Scalars['String']>;
  routeTableId?: Maybe<Scalars['String']>;
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
  name?: Maybe<Scalars['String']>;
  subnets?: Maybe<Array<Maybe<TencentSubnet>>>;
  tags?: Maybe<Array<Maybe<TencentRawTag>>>;
};

export type TencentVpcAssistantCidr = {
  assistantType?: Maybe<Scalars['Int']>;
  cidrBlock?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  subnetSet?: Maybe<Array<Maybe<TencentSubnet>>>;
  vpcId?: Maybe<Scalars['String']>;
};
