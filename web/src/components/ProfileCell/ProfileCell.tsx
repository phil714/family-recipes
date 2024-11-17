import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import type { EditUserById, UpdateUserMutationVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from 'src/components/Avatar/Avatar'
import { Button } from 'src/components/Button/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/components/Card/Card'
import { Input } from 'src/components/Input/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/Select/Select'
import { transform } from 'src/lib/file-upload'

import { FileInput } from '../FileInput/FileInput'
import { Label } from '../Label/Label'

export const QUERY: TypedDocumentNode<EditUserById> = gql`
  query EditUserById($id: String!) {
    user: user(id: $id) {
      id
      name
      language
      avatarUrl
    }
  }
`

const UPDATE_USER_MUTATION: TypedDocumentNode<
  EditUserById,
  UpdateUserMutationVariables
> = gql`
  mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      language
      avatarUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<EditUserById>) => {
  const { currentUser, reauthenticate } = useAuth()
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const [name, setName] = useState(user.name)
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl ?? null)
  const [language, setLanguage] = useState(user.language ?? i18n.language)

  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Profile updated')
      i18n.changeLanguage(language)
      reauthenticate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
  }

  const handleAvatarChange = (value: string) => {
    const transformedImage = transform(value, { circle: true })
    setAvatarUrl(transformedImage)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    updateUser({
      variables: {
        id: currentUser.id,
        input: {
          name,
          language,
          avatarUrl,
        },
      },
    })
  }

  return (
    <>
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>{t('profile:title')}</CardTitle>
          <CardDescription>{t('profile:description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="avatar">{t('user:avatar')}</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage alt={name} src={avatarUrl} />
                    <AvatarFallback>
                      {name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <FileInput onChange={handleAvatarChange} />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{t('user:name')}</Label>
                <Input id="name" value={name} onChange={handleNameChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="language">{t('user:language')}</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder={t('profile:select-language')} />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            {t('common:save')}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
