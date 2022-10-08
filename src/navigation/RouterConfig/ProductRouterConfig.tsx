import { lazy } from 'react'
import RouteUrl from '../../constants/router'

export const ProductRouterConfig = [
  {
    path: RouteUrl.CREATE_PRODUCT,
    component: lazy(() => import('../../screens/Product/New'))
  },
  {
    path: RouteUrl.LIST_PRODUCT,
    component: lazy(() => import('../../screens/Product/List'))
  },
  {
    path: RouteUrl.EDIT_PRODUCT,
    component: lazy(() => import('../../screens/Product/Edit'))
  }
]
