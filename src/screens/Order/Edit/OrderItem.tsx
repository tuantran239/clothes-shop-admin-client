import React, { Fragment } from 'react'
import ButtonCustom from '@/components/ButtonCustom'
import useModal from '@/hooks/useModal'
import DeleteModal from '@/components/DeleteModal/DeleteModal'
import { ApiUrl } from '@/constants'

interface PropsType {
  OrderID: any
  orderItem?: any
  onRomveItem: (item: any) => void
}

const OrderItem = ({ orderItem, OrderID, onRomveItem }: PropsType) => {
  const { mainImage, color, size, quantity, price, name, amount, inStock } =
    orderItem

  const { handleShow, handleClose, displayModal } = useModal()

  return (
    <Fragment>
      {displayModal({
        component: (
          <DeleteModal
            url={`${ApiUrl.Order.REMOVE_ORDER_ITEM}?id=${
              orderItem?.id
            }&OrderID=${OrderID}&totalItem=${
              orderItem?.price * orderItem?.quantity
            }`}
            handleClose={handleClose}
            onCompleted={() => onRomveItem(orderItem)}
          />
        )
      })}
      <tr>
        <td>{name || ''}</td>
        <td className="text-center">
          <img
            width="80px"
            height="80px"
            alt="image product"
            src={mainImage?.url || ''}
          />
        </td>
        <td>{size || ''}</td>
        <td>{color || ''}</td>
        <td>{price || ''}</td>
        <td>{quantity || ''}</td>
        <td>{amount}</td>
        <td>
          {inStock !== undefined && (
            <Fragment>
              {inStock && <p className="text-success">In stock</p>}
              {!inStock && <p className="text-danger">Out of stock</p>}
            </Fragment>
          )}
        </td>
        <td>
          {' '}
          <ButtonCustom variant="danger" type="button" onClick={handleShow}>
            Remove
          </ButtonCustom>
        </td>
      </tr>
    </Fragment>
  )
}

export default OrderItem
