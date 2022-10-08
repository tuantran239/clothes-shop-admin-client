import React, { lazy, useEffect, Fragment } from 'react'
import { useQuery } from 'react-hooks-axios'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import Loading from '../../components/Loading'
import { ApiUrl } from '../../constants'
import { IsLogin } from '../../constants/auth'
import RouteUrl from '../../constants/router'
import { UserState } from '../../recoil/user'
import Login from '../../screens/Login/Login'
import { OrderRouterConfig } from '../RouterConfig/OrderRouterConfig'
import { ProductRouterConfig } from '../RouterConfig/ProductRouterConfig'
import { UserRouterConfig } from '../RouterConfig/UserRouterConfig'
import OrderRouter from './OrderRouter'
import ProductRouter from './ProductRouter'
import UserRouter from './UserRouter'

const Home = lazy(() => import('../../screens/Home'))

const renderRoute = (routeConfig: any, RouteComponent: any) => {
  return routeConfig.map(({ path, component }: any) => {
    return (
      <Route
        key={path}
        path={path}
        element={<RouteComponent component={component} />}
      />
    )
  })
}

const AppRouter = () => {
  const { queryCallback } = useQuery()
  const [auth, { loading }] = queryCallback(ApiUrl.Auth.AUTH)

  const setUser = useSetRecoilState(UserState)
  const navigate = useNavigate()

  useEffect(() => {
    auth({
      onCompleted(data) {
        setUser(data.user)
        if (!IsLogin) {
          localStorage.setItem('isLogin', JSON.stringify(true))
          window.location.reload()
        }
      },
      onError() {
        navigate(RouteUrl.LOGIN)
        if (IsLogin) {
          localStorage.removeItem('isLogin')
          window.location.reload()
        }
      }
    })
  }, [])

  return (
    <Fragment>
      {loading && <Loading />}
      {!loading && (
        <Routes>
          <Route path={RouteUrl.HOME} element={<Home />} />
          <Route path={RouteUrl.LOGIN} element={<Login />} />
          {renderRoute(ProductRouterConfig, ProductRouter)}
          {renderRoute(UserRouterConfig, UserRouter)}
          {renderRoute(OrderRouterConfig, OrderRouter)}
        </Routes>
      )}
    </Fragment>
  )
}

export default AppRouter
