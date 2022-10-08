import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { Collapse } from 'react-bootstrap'
import { sidebars } from './DataSidebar'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const displaySidebarItems = () => {
    return sidebars.map((sidebar) => {
      return <SidebarItem sidebar={sidebar} key={sidebar.Title} />
    })
  }

  return (
    <aside className="sticky top-0 left-0 z-20 flex-shrink-0 hidden w-64 h-screen overflow-y-hidden bg-gray-800 md:block">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <ul className="mt-6">{displaySidebarItems()}</ul>
      </div>
    </aside>
  )
}

export default Sidebar
