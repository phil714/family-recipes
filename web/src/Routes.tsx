// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, PrivateSet } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import CMSLayout from './layouts/CMSLayout/CMSLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet wrap={CMSLayout} unauthenticated="login">
        <Set wrap={ScaffoldLayout} title="Invitations" titleTo="invitations" buttonLabel="New Invitation" buttonTo="newInvitation">
          <Route path="/invitations/new" page={InvitationNewInvitationPage} name="newInvitation" />
          <Route path="/invitations/{id}/edit" page={InvitationEditInvitationPage} name="editInvitation" />
          <Route path="/invitations/{id}" page={InvitationInvitationPage} name="invitation" />
          <Route path="/invitations" page={InvitationInvitationsPage} name="invitations" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Tags" titleTo="tags" buttonLabel="New Tag" buttonTo="newTag">
          <Route path="/tags/new" page={TagNewTagPage} name="newTag" />
          <Route path="/tags/{id}/edit" page={TagEditTagPage} name="editTag" />
          <Route path="/tags/{id}" page={TagTagPage} name="tag" />
          <Route path="/tags" page={TagTagsPage} name="tags" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Recipes" titleTo="recipes" buttonLabel="New Recipe" buttonTo="newRecipe">
          <Route path="/recipes/new" page={RecipeNewRecipePage} name="newRecipe" />
          <Route path="/recipes/{id}/edit" page={RecipeEditRecipePage} name="editRecipe" />
          <Route path="/recipes/{id}" page={RecipeRecipePage} name="recipe" />
          <Route path="/recipes" page={RecipeRecipesPage} name="recipes" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Families" titleTo="families" buttonLabel="New Family" buttonTo="newFamily">
          <Route path="/families/new" page={FamilyNewFamilyPage} name="newFamily" />
          <Route path="/families/{id}/edit" page={FamilyEditFamilyPage} name="editFamily" />
          <Route path="/families/{id}" page={FamilyFamilyPage} name="family" />
          <Route path="/families" page={FamilyFamiliesPage} name="families" />
        </Set>
        <Route path="/" page={HomePage} name="home" />
      </PrivateSet>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
      <Route path="/invitations/{id}/accept" page={InvitationAcceptPage} name="invitationAccept" />
    </Router>
  )
}

export default Routes
