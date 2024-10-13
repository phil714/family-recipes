import enCommon from '../src/locales/en/common.json'
import enGlossary from '../src/locales/en/glossary.json'
import enUserMenu from '../src/locales/en/user-menu.json'
import enProfile from '../src/locales/en/profile.json'
import enUser from '../src/locales/en/user.json'
import enRecipe from '../src/locales/en/recipe.json'
import enFamily from '../src/locales/en/family.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof enCommon
      glossary: typeof enGlossary
      'user-menu': typeof enUserMenu
      profile: typeof enProfile
      user: typeof enUser
      recipe: typeof enRecipe
      family: typeof enFamily
    }
  }
}
