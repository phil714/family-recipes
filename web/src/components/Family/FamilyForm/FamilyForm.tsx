import type { EditFamilyById, UpdateFamilyInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormFamily = NonNullable<EditFamilyById['family']>

interface FamilyFormProps {
  family?: EditFamilyById['family']
  onSave: (data: UpdateFamilyInput, id?: FormFamily['id']) => void
  error: RWGqlError
  loading: boolean
}

const FamilyForm = (props: FamilyFormProps) => {
  const onSubmit = (data: FormFamily) => {
    props.onSave(data, props?.family?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormFamily> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.family?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FamilyForm
