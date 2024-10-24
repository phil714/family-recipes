import { useState } from 'react'

import { Metadata } from '@redwoodjs/web'

import AllRecipes from 'src/components/AllRecipesCell'
import AllRecipesSearchBar from 'src/components/AllRecipesSearchBar/AllRecipesSearchBar'

const HomePage = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <>
      <Metadata title="Home" description="Home page" />
      <div className="mt-20 flex h-full w-full flex-col items-center justify-center lg:mt-80">
        <AllRecipesSearchBar onChange={setSearchText} />
        <AllRecipes searchParams={{ searchText }} />
      </div>
    </>
  )
}

export default HomePage
