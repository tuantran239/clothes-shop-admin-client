import { lazy } from 'react'
import RouteUrl from '../../constants/router'

export const OrderRouterConfig = [
  {
    path: RouteUrl.LIST_ORDER,
    component: lazy(() => import('../../screens/Order/List'))
  },
  {
    path: RouteUrl.EDIT_ORDER,
    component: lazy(() => import('../../screens/Order/Edit'))
  }
]
