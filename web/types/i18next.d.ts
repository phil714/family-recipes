import enCommon from '../src/locales/en/common.json'
import enGlossary from '../src/locales/en/glossary.json'
import enUserMenu from '../src/locales/en/user-menu.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof enCommon
      glossary: typeof enGlossary
      'user-menu': typeof enUserMenu
    }
  }
}
