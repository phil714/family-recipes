import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [Sentry.prismaIntegration(), Sentry.httpIntegration()],
  tracesSampleRate: 1.0,
})

export default Sentry
