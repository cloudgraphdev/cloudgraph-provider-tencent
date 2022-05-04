import { regionMap } from '../enums/regions'
import services from '../enums/services'

export const GLOBAL_REGION = 'global'
export const DEFAULT_REGION = regionMap.easternUS
export const DEFAULT_RESOURCES = Object.values(services).join(',')
