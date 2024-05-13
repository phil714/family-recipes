import type { EditInvitationById, UpdateInvitationInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  Submit,
  Controller,
} from '@redwoodjs/forms'

import FamilyInputCell from 'src/components/FamilyInputCell'

type FormInvitation = NonNullable<EditInvitationById['invitation']>

interface InvitationFormProps {
  invitation?: EditInvitationById['invitation']
  onSave: (data: UpdateInvitationInput, id?: FormInvitation['id']) => void
  error: RWGqlError
  loading: boolean
}

const InvitationForm = (props: InvitationFormProps) => {
  const onSubmit = (data: FormInvitation) => {
    props.onSave(data, props?.invitation?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormInvitation> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.invitation?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="familyId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Family
        </Label>

        <Controller
          name="familyId"
          defaultValue={props.invitation?.familyId}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <FamilyInputCell onChange={onChange} value={value} />
          )}
        />

        <FieldError name="familyId" className="rw-field-error" />

        <Label
          name="accessRole"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Access role
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="invitation-accessRole-0"
            name="accessRole"
            defaultValue="USER"
            defaultChecked={props.invitation?.accessRole?.includes('USER')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>User</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="invitation-accessRole-1"
            name="accessRole"
            defaultValue="ADMIN"
            defaultChecked={props.invitation?.accessRole?.includes('ADMIN')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Admin</div>
        </div>

        <FieldError name="accessRole" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default InvitationForm
