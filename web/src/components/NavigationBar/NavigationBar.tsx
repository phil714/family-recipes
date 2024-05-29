'use client'

import {
  BookOpen,
  HomeIcon,
  ListIcon,
  LucideProps,
  SendIcon,
  UsersIcon,
} from 'lucide-react'

import { NavLink, routes } from '@redwoodjs/router'

import { buttonVariants } from 'src/components/Button/Button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from 'src/components/Tooltip/Tooltip'
import { cn } from 'src/lib/utils'

import { UserMenu } from '../UserMenu/UserMenu'

interface NavItem {
  title: string
  to: string
  label?: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
}

export const NavigationBar = () => {
  const isCollapsed = false //TODO: implement

  const links: NavItem[] = [
    {
      title: 'Home',
      to: routes.home(),
      icon: HomeIcon,
    },
    {
      title: 'Recipes',
      to: routes.recipes(),
      icon: BookOpen,
    },
    {
      title: 'Families',
      to: routes.families(),
      icon: UsersIcon,
    },
    {
      title: 'Invitations',
      to: routes.invitations(),
      icon: SendIcon,
    },
    {
      title: 'Tags',
      to: routes.tags(),
      icon: ListIcon,
    },
  ]

  return (
    <div
      data-collapsed={isCollapsed}
      className="border-right group flex w-64 flex-col gap-4 border border-gray-100 py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center">
        <UserMenu />
        {links.map((link, index) => (
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to={link.to}
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    size: isCollapsed ? 'icon' : 'default',
                  }),
                  'flex items-center gap-2'
                )}
                activeClassName={cn(
                  buttonVariants({
                    variant: 'default',
                    size: isCollapsed ? 'icon' : 'default',
                  }),
                  'hover:text-primary-foreground'
                )}
              >
                <link.icon className="h-4 w-4" />
                {!isCollapsed && <span>{link.title}</span>}
                {!isCollapsed && link.label && <span>{link.label}</span>}
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {link.title}
              {link.label && (
                <span className="ml-auto text-muted-foreground">
                  {link.label}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </div>
  )
}
