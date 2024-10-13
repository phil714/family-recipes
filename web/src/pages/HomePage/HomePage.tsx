import { Link, routes, useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import AllRecipes from 'src/components/AllRecipesCell'
import { useAuth } from 'src/auth'
import AllRecipesSearchBar from 'src/components/AllRecipesSearchBar/AllRecipesSearchBar'
import { useMemo, useState } from 'react'

const HomePage = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Metadata title="Home" description="Home page" />
      <div className='w-full h-full flex flex-col items-center justify-center mt-20 lg:mt-80'>
        <AllRecipesSearchBar onChange={setSearchText} />
        <AllRecipes searchParams={{ searchText }} />
      </div>
    </>
  )
}

export default HomePage
