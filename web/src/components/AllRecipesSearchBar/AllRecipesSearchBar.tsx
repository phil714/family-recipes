import { useState } from 'react'

import { t } from 'i18next'
import { Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

import { useLocation } from '@redwoodjs/router'

import { Input } from '../Input/Input'

interface Props {
  onChange: (searchText: string) => void
}

const AllRecipesSearchBar = React.memo((props: Props) => {
  const { search } = useLocation()
  const [searchText, setSearchText] = useState(
    new URLSearchParams(search).get('search') ?? ''
  )

  const debouncedOnChange = useDebouncedCallback(
    (debouncedSearchText: string) => {
      // navigate(routes.home({ search: val }), { replace: true, }) TODO: fix later, make input lose focus
      props.onChange(debouncedSearchText)
    },
    250
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchText(newValue)
    debouncedOnChange(newValue)
  }

  return (
    <div className="relative flex-1 gap-4 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={t('common:search-placeholder')}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        value={searchText}
        onChange={handleChange}
      />
    </div>
  )
})

export default AllRecipesSearchBar
