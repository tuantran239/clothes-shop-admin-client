import React, { useState, Fragment } from 'react'
import { Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SidebarType } from './DataSidebar'

interface PropsType {
  sidebar: SidebarType
}

const SidebarItem = ({ sidebar }: PropsType) => {
  const { Icon, Title } = sidebar
  const [open, setOpen] = useState(false)

  const displayOptions = () => {
    const { options } = sidebar
    if (options && options.length > 0) {
      return options.map((option) => {
        return (
          <div>
            <Link
              key={option.title}
              to={option.link}
              className="text-white no-underline ml-9"
            >
              {option.title}
            </Link>
          </div>
        )
      })
    }
  }

  return (
    <li className="relative px-6 py-3">
      <span
        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        aria-hidden="true"
      ></span>
      <div
        className="inline-flex items-center w-full text-lg font-semibold text-white no-underline transition-colors duration-150 cursor-pointer hover:text-white"
        onClick={() => setOpen(!open)}
      >
        {Icon && <Icon />}
        <span className="ml-4">{Title}</span>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">{displayOptions()}</div>
      </Collapse>
    </li>
  )
}

export default SidebarItem
