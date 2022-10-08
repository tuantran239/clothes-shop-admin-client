import { lazy } from 'react'
import RouteUrl from '../../constants/router'

export const UserRouterConfig = [
  {
    path: RouteUrl.CREATE_USER,
    component: lazy(() => import('../../screens/User/New'))
  },
  {
    path: RouteUrl.LIST_USER,
    component: lazy(() => import('../../screens/User/List'))
  },
  {
    path: RouteUrl.EDIT_USER,
    component: lazy(() => import('../../screens/User/Edit'))
  }
]
