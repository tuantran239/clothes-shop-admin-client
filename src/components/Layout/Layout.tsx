import React, { Fragment } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'

interface PropsType {
  children: React.ReactNode
}

const Layout = ({ children }: PropsType) => {
  return (
    <Fragment>
      <Header />
      <div className="flex flex-row flex-1 w-full">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </Fragment>
  )
}

export default Layout
