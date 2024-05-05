import NavigationBar from 'src/components/NavigationBar/NavigationBar'

type CMSLayoutProps = {
  children?: React.ReactNode
}

const CMSLayout = ({ children }: CMSLayoutProps) => {
  return (
    <div>
      <NavigationBar />
      <div className="h-full w-full">{children}</div>
    </div>
  )
}

export default CMSLayout
