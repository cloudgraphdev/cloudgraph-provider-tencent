export interface Tag {
  Key: string
  Value: string
}

export interface TagMap {
  [property: string]: string
}

export interface KeyValueMapMap {
  [k: string]: string | number | boolean | Long
}

export interface TencentServiceInput {
  regions: string
  config: TencentCredentials
  rawData: rawDataInterface[]
}

export interface TencentCredentials {
  secretId: string
  secretKey: string
}

export interface rawDataInterface {
  name: string
  region?: string
  data: any
  subnets?: string[]
  TagSet?: Tag[]
}
