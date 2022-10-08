const User = {
  CREATE_USER: '/user/new',
  LIST_USER: '/user/list',
  EDIT_USER: '/user/edit'
}

const Product = {
  CREATE_PRODUCT: '/product/new',
  LIST_PRODUCT: '/product/list',
  EDIT_PRODUCT: '/product/edit'
}

const Order = {
  LIST_ORDER: '/order/list',
  EDIT_ORDER: '/order/edit'
}

const Common = {
  HOME: '/',
  LOGIN: '/login'
}

const RouteUrl = Object.assign({}, User, Common, Product, Order)

export default RouteUrl
