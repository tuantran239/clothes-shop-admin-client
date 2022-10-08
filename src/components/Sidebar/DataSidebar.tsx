import { AiFillHome } from 'react-icons/ai'
import { FaUserFriends, FaProductHunt, FaShoppingCart } from 'react-icons/fa'
import { RouteUrl } from '../../constants'

export type SidebarOption = {
  title: string
  link: string
}

export type SidebarType = {
  Icon?: React.ElementType
  Title: string
  Link: string
  options?: SidebarOption[]
}

export const sidebars: SidebarType[] = [
  {
    Icon: AiFillHome,
    Title: 'Dashboard',
    Link: RouteUrl.HOME
  },
  {
    Icon: FaUserFriends,
    Title: 'Users',
    Link: RouteUrl.HOME,
    options: [
      {
        title: 'Create user',
        link: RouteUrl.CREATE_USER
      },
      {
        title: 'List user',
        link: RouteUrl.LIST_USER
      }
    ]
  },
  {
    Icon: FaProductHunt,
    Title: 'Products',
    Link: RouteUrl.HOME,
    options: [
      {
        title: 'Create product',
        link: RouteUrl.CREATE_PRODUCT
      },
      {
        title: 'List product',
        link: RouteUrl.LIST_PRODUCT
      }
    ]
  },
  {
    Icon: FaShoppingCart,
    Title: 'Orders',
    Link: RouteUrl.HOME,
    options: [
      {
        title: 'List order',
        link: RouteUrl.LIST_ORDER
      }
    ]
  }
]
