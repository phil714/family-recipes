import { NavLink, routes } from '@redwoodjs/router'

const NavigationBar = () => {
  return (
    <ul className="h-full">
      <li>
        <NavLink
          className="link"
          activeClassName="activeLink"
          to={routes.home()}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="link"
          activeClassName="activeLink"
          to={routes.home({ tab: 'tutorial' })}
        >
          Tutorial
        </NavLink>
      </li>
    </ul>
  )
}

export default NavigationBar
