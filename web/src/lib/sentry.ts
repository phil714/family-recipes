import * as Sentry from '@sentry/react'

let dsn = ''
let environment = 'development'

const sentryEnabled = process.env?.SENTRY_ENABLED === 'true'

if (
  sentryEnabled &&
  (typeof process === 'undefined' || !process.env?.SENTRY_DSN)
) {
  console.error(
    'Missing SENTRY_DSN environment variable. Did you forget to add it to ' +
      'your redwood.toml file in `includeEnvironmentVariables`?'
  )
  console.info(`Copy this into your redwood.toml file:`)
  console.info(`
  includeEnvironmentVariables = [
    "SENTRY_DSN"
  ]

  `)
  console.error('Sentry is disabled for now')
} else {
  dsn = process.env.SENTRY_DSN
  environment = process.env.NODE_ENV
}

if (sentryEnabled)
  Sentry.init({
    dsn,
    environment,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  })

export default Sentry
