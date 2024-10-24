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
      <PrivateSet wrap={CMSLayout} unauthenticated="home">
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Set wrap={ScaffoldLayout} title="Recipes" titleTo="recipes" buttonLabel="New Recipe" buttonTo="newRecipe">
          <PrivateSet roles={['ADMIN', 'USER']} unauthenticated="home">
            <Route path="/recipes/new" page={RecipeNewRecipePage} name="newRecipe" />
            <Route path="/recipes/{id}/edit" page={RecipeEditRecipePage} name="editRecipe" />
          </PrivateSet>
          <Route path="/recipes" page={RecipeRecipesPage} name="recipes" />
        </Set>
        <PrivateSet unauthenticated="home" roles="ADMIN">
          <Set wrap={ScaffoldLayout} title="Invitations" titleTo="invitations" buttonLabel="New Invitation" buttonTo="newInvitation">
            <Route path="/invitations/new" page={InvitationNewInvitationPage} name="newInvitation" />
            <Route path="/invitations/{id}/edit" page={InvitationEditInvitationPage} name="editInvitation" />
            <Route path="/invitations/{id}" page={InvitationInvitationPage} name="invitation" />
            <Route path="/invitations" page={InvitationInvitationsPage} name="invitations" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Families" titleTo="families" buttonLabel="New Family" buttonTo="newFamily">
            <Route path="/families/new" page={FamilyNewFamilyPage} name="newFamily" />
            <Route path="/families/{id}/edit" page={FamilyEditFamilyPage} name="editFamily" />
            <Route path="/families/{id}" page={FamilyFamilyPage} name="family" />
            <Route path="/families" page={FamilyFamiliesPage} name="families" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Tags" titleTo="tags" buttonLabel="New Tag" buttonTo="newTag">
            <Route path="/tags/new" page={TagNewTagPage} name="newTag" />
            <Route path="/tags/{id}/edit" page={TagEditTagPage} name="editTag" />
            <Route path="/tags/{id}" page={TagTagPage} name="tag" />
            <Route path="/tags" page={TagTagsPage} name="tags" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Ingredients" titleTo="ingredients" buttonLabel="New Ingredient" buttonTo="newIngredient">
            <Route path="/ingredients/new" page={IngredientNewIngredientPage} name="newIngredient" />
            <Route path="/ingredients/{id}/edit" page={IngredientEditIngredientPage} name="editIngredient" />
            <Route path="/ingredients/{id}" page={IngredientIngredientPage} name="ingredient" />
            <Route path="/ingredients" page={IngredientIngredientsPage} name="ingredients" />
          </Set>
        </PrivateSet>
      </PrivateSet>
      <Set wrap={CMSLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/recipes/{id}" page={RecipeRecipePage} name="recipe" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
      <Route path="/invitations/{code}/accept" page={InvitationAcceptPage} name="invitationAccept" />
    </Router>
  )
}

export default Routes
