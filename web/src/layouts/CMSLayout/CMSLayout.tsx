import { useEffect } from 'react'

import { TooltipProvider } from '@radix-ui/react-tooltip'

import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { NavigationBar } from 'src/components/NavigationBar/NavigationBar'
import Sentry from 'src/lib/sentry'

type CMSLayoutProps = {
  children?: React.ReactNode
}

const CMSLayout = ({ children }: CMSLayoutProps) => {
  const { currentUser } = useAuth()

  useEffect(() => Sentry.setUser(currentUser), [currentUser])

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <TooltipProvider delayDuration={0}>
        <div className="flex h-screen w-screen flex-row">
          <NavigationBar />
          <div className="h-full w-full p-2">{children}</div>
        </div>
      </TooltipProvider>
    </>
  )
}

export default CMSLayout
