import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './i18n'

injectSpeedInsights()
inject()

import App from './App'
/**
 * When `#redwood-app` isn't empty then it's very likely that you're using
 * prerendering. So React attaches event listeners to the existing markup
 * rather than replacing it.
 * https://react.dev/reference/react-dom/client/hydrateRoot
 */
const redwoodAppElement = document.getElementById('redwood-app')

if (!redwoodAppElement) {
  throw new Error(
    "Could not find an element with ID 'redwood-app'. Please ensure it exists in your 'web/src/index.html' file."
  )
}

if (redwoodAppElement.children?.length > 0) {
  hydrateRoot(redwoodAppElement, <App />)
} else {
  const root = createRoot(redwoodAppElement)
  root.render(<App />)
}
