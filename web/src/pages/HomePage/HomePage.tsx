import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { Button } from 'src/components/Button/Button'

const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()

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
        <p>Is Authenticated: {String(isAuthenticated)}</p>
        <Button onClick={() => logOut()}>Log Out</Button>
      </p>
    </>
  )
}

export default HomePage
