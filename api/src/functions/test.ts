import { logger } from 'src/lib/logger'

export const config = {}

export default function handler(_req: Request) {
  logger.debug('HALO')
  return new Response('Hello World')
}
