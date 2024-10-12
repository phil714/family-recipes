import type { EditRecipeById, UpdateRecipeInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
  Controller,
} from '@redwoodjs/forms'

import FamilyInputCell from 'src/components/FamilyInputCell'
import RecipeTagsInputCell from 'src/components/RecipeTagsInputCell'
import RecipeIngredientsInputCell from 'src/components/RecipeIngredientsInputCell'
import TextEditor from 'src/components/TextEditor/TextEditor'
import RecipeStatusSelect from 'src/components/RecipeStatusSelect/RecipeStatusSelect'
type FormRecipe = NonNullable<
  Omit<EditRecipeById['recipe'], 'tags'> & { tagIds: string[]; ingredientIds: string[] }
>

interface RecipeFormProps {
  recipe?: EditRecipeById['recipe']
  onSave: (data: UpdateRecipeInput, id?: FormRecipe['id']) => void
  error: RWGqlError
  loading: boolean
}

const RecipeForm = (props: RecipeFormProps) => {
  const onSubmit = (data: FormRecipe) => {
    props.onSave({ ...data, tagIds: data.tagIds }, props?.recipe?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRecipe> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.recipe?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <Controller
          name="description"
          defaultValue={props.recipe?.description || ''}
          // rules={validation}
          render={({ field: { value, onChange } }) => (
            <TextEditor value={value} onChange={onChange} />
          )}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="ingredientIds"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ingredients
        </Label>
        <Controller
          name="ingredientIds"
          defaultValue={props.recipe?.ingredients.map((ingredient) => ingredient.id) || []}
          // rules={validation}
          render={({ field: { onChange, value } }) => (
            <RecipeIngredientsInputCell onChange={onChange} value={value} />
          )}
        />
        <FieldError name="ingredientIds" className="rw-field-error" />

        <Label
          name="instructions"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Instructions
        </Label>

        <TextField
          name="instructions"
          defaultValue={props.recipe?.instructions}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="instructions" className="rw-field-error" />

        <Label
          name="preparationTimeMinutes"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Preparation time minutes
        </Label>

        <NumberField
          name="preparationTimeMinutes"
          defaultValue={props.recipe?.preparationTimeMinutes}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="preparationTimeMinutes" className="rw-field-error" />

        <Label
          name="cookingTimeMinutes"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cooking time minutes
        </Label>

        <NumberField
          name="cookingTimeMinutes"
          defaultValue={props.recipe?.cookingTimeMinutes}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="cookingTimeMinutes" className="rw-field-error" />

        <Label
          name="familyId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Family
        </Label>

        <Controller
          name="familyId"
          defaultValue={props.recipe?.familyId}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <FamilyInputCell onChange={onChange} value={value} />
          )}
        />

        <FieldError name="familyId" className="rw-field-error" />


        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>
        <Controller
          name="status"
          defaultValue={props.recipe?.status}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <RecipeStatusSelect id={"status"} value={value} onChange={onChange} />
          )}
        />
        <FieldError name="status" className="rw-field-error" />



        <Label
          name="tagIds"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tags
        </Label>
        <Controller
          name="tagIds"
          defaultValue={props.recipe?.tags.map((tag) => tag.id) || []}
          // rules={validation}
          render={({ field: { onChange, value } }) => (
            <RecipeTagsInputCell onChange={onChange} value={value} />
          )}
        />
        <FieldError name="tags" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RecipeForm
