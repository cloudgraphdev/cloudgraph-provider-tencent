import cuid from 'cuid'
import { TencentKeyValue, TencentRawTag } from '../types/generated'
import { TagMap, KeyValueMapMap } from '../types'

export const formatKeyValueMap = (keyValueMap: KeyValueMapMap): TencentKeyValue[] => {
  return Object.keys(keyValueMap || {}).map(key => ({
    id: cuid(),
    key,
    value: keyValueMap[key].toString(),
  }))
}

// We need an id here to enfore uniqueness for Dgraph, otherwise we get duplicate tags
export const formatTagsFromMap = (tags: TagMap): TencentRawTag[] => formatKeyValueMap(tags)

export const obfuscateSensitiveString = (s: string): string => {
  const stars = '*'.repeat(Math.min(30, s.length - 6))
  return s.slice(0, 3) + stars + s.slice(stars.length + 3, s.length)
}

export const enumKeyToString = (enumType: any, key: any): string => {
  if (!key)
    return '';
  const keys = Object.keys(enumType)
  const stateIndex = enumType[key]
  return keys[stateIndex] || key
}

export const etagToString = (etag: string | Uint8Array): string => {
  return etag instanceof Uint8Array ? Buffer.from(etag).toString('base64') : etag
}
