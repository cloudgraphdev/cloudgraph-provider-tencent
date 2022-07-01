import CloudGraph from '@cloudgraph/sdk'
import environment from '../config/environment'

const { logger } = CloudGraph

export function initTestEndpoint(service?: string): string | undefined {
  const endpoint =
    (environment.NODE_ENV === 'test' && environment.TENCENT_ENDPOINT) || undefined
  service && endpoint && logger.info(`${service} getData in test mode!`)
  return endpoint
}

export function generateTencentErrorLog(
  service: string,
  functionName: string,
  err?: Error
): void {
  logger.warn(
    `There was a problem getting data for service ${service}, CG encountered an error calling ${functionName}`
  )
  logger.debug(err.message)
}

export function getMutation(serviceName: string) {
  return `
    mutation($input: [Add${serviceName}Input!]!) {
      add${serviceName}(input: $input, upsert: true) {
        numUids
      }
    }
  `
}
