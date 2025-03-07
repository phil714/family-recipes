import { t } from 'i18next'
import { ChevronDownIcon } from 'lucide-react'
import { AccessRole } from 'types/graphql'

import { Button } from '../Button/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../Command/Command'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/Popover'

interface Props {
  value: AccessRole
  onChange: (value: AccessRole) => void
  disabled?: boolean
}

const options: Record<AccessRole, { label: string; description: string }> = {
  VIEWER: {
    label: 'Viewer',
    description: 'Can view recipes',
  },
  USER: {
    label: 'Member',
    description: 'Can view and edit recipes.',
  },
  ADMIN: {
    label: 'Administrator',
    description: 'Admin-level access to everything.',
  },
}

const AccessRoleSelect = (props: Props) => {
  const handleSelect = (value: AccessRole) => () => {
    props.onChange(value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="ml-auto" disabled={props.disabled}>
          {options[props.value].label}
          <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <Command>
          <CommandInput placeholder={t('common:select-placeholder')} />
          <CommandList>
            <CommandEmpty>No roles found.</CommandEmpty>
            <CommandGroup className="p-1.5">
              {Object.entries(options).map(
                ([value, { label, description }]) => (
                  <Option
                    key={value}
                    label={label}
                    description={description}
                    onSelect={handleSelect(value as AccessRole)}
                  />
                )
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default AccessRoleSelect

interface OptionProps {
  label: string
  description: string
  onSelect: () => void
}

const Option = (props: OptionProps) => (
  <CommandItem
    className="flex flex-col items-start px-4 py-2"
    onSelect={props.onSelect}
  >
    <p>{props.label}</p>
    <p className="text-sm text-muted-foreground">{props.description}</p>
  </CommandItem>
)
