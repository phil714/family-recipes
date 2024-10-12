import { Link, routes, useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import AllRecipes from 'src/components/AllRecipesCell'
import { useAuth } from 'src/auth'
import AllRecipesSearchBar from 'src/components/AllRecipesSearchBar/AllRecipesSearchBar'
import { useMemo } from 'react'

const HomePage = () => {
  const { isAuthenticated, currentUser } = useAuth()
  // const { search } = useLocation()
  // const searchText = useMemo(() => new URLSearchParams(search).get('search') ?? '', [search]);

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
        <span>Is Authenticated: {String(isAuthenticated)}</span>
        <span>{`User Email: ${currentUser?.email ?? ''}`}</span>

        <AllRecipesSearchBar />
        <AllRecipes searchParams={{ searchText: '' }} />
      </p>
    </>
  )
}

export default HomePage
