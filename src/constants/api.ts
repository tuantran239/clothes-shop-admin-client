const AuthAdminDomain = '/api/v1/admin/auth'
const ProductAdminDomain = '/api/v1/admin/prouct'
const UserAdminDomain = '/api/v1/admin/user'
const OrderAdminDomain = '/api/v1/admin/order'

const Auth = {
  LOGIN: `${AuthAdminDomain}/login`,
  AUTH: `${AuthAdminDomain}/`,
  LOGOUT: `${AuthAdminDomain}/logout`
}

const User = {
  NEW_USER: `${UserAdminDomain}/create-user`,
  LIST_USER: `${UserAdminDomain}/all`,
  GET_USER: `${UserAdminDomain}/one`,
  DELETE_USER: `${UserAdminDomain}/delete-user`,
  UPDATE_USER: `${UserAdminDomain}/update-user`
}

const Product = {
  NEW_PRODUCT: `${ProductAdminDomain}/create-product`,
  LIST_PRODUCT: `${ProductAdminDomain}/all`,
  GET_PRODUCT: `${ProductAdminDomain}/one`
}

const Order = {
  LIST_ORDER: `${OrderAdminDomain}/all`,
  GET_ORDER: `${OrderAdminDomain}/one`,
  UPDATE_ORDER: `${OrderAdminDomain}/update-order`,
  UPDATE_ORDER_STATE: `${OrderAdminDomain}/update-order-state`,
  CHECK_ORDER: `${OrderAdminDomain}/check-order`,
  ORDER: `${OrderAdminDomain}/order`,
  REMOVE_ORDER_ITEM: `${OrderAdminDomain}/remove-item`
}

export const ApiUrl = {
  Product,
  Auth,
  User,
  Order
}
