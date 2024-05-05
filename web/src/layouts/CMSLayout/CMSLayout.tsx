import { TooltipProvider } from '@radix-ui/react-tooltip'

import { NavigationBar } from 'src/components/NavigationBar/NavigationBar'

type CMSLayoutProps = {
  children?: React.ReactNode
}

const CMSLayout = ({ children }: CMSLayoutProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen w-screen flex-row">
        <NavigationBar />
        <div className="h-full w-full p-2">{children}</div>
      </div>
    </TooltipProvider>
  )
}

export default CMSLayout
