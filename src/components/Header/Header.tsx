import { ApiUrl } from '@/constants'
import useAlert from '@/hooks/useAlert'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-hooks-axios'
import { useRecoilValue } from 'recoil'
import { UserState } from '../../recoil/user'

import './Header.css'

const Header = () => {
  const user = useRecoilValue(UserState)

  const { queryCallback } = useQuery()
  const [logout] = queryCallback(ApiUrl.Auth.LOGOUT)

  const alert = useAlert()

  const onLogoutHandler = async () => {
    await logout({
      onCompleted() {
        window.location.reload()
      },
      onError() {
        alert.errorToast('Cant logout')
      }
    })
  }

  return (
    <header className="sticky top-0 left-0 z-10 w-full py-4 bg-gray-800 shadow-md">
      <div className="px-5 d-flex justify-content-between">
        <div className="right">
          <h1 className="text-base text-white">ADMIN DASHBOARD</h1>
        </div>
        <div className="left">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="bg-gray-800 d-flex align-items-center"
            >
              <img
                id="dropdown-basic"
                className="w-10 h-10 rounded-full"
                src={user?.avatar?.url}
                alt="Rounded avatar"
              ></img>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Update password</Dropdown.Item>
              <Dropdown.Item href="#" onClick={onLogoutHandler}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

export default Header
