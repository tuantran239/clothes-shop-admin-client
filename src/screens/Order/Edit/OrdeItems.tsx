import React, { Fragment, useEffect, useState } from 'react'
import ButtonCustom from '@/components/ButtonCustom'
import { ApiUrl } from '@/constants'
import useAlert from '@/hooks/useAlert'
import { handleError } from '@/utils'
import { Table } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import OrderItem from './OrderItem'

interface PropsType {
  items?: any[]
  OrderID?: any
}

const OrdeItems = ({ items, OrderID }: PropsType) => {
  const [orderItems, setOrderItems] = useState<any[]>([])

  const { mutationCallback } = useMutation()
  const [checkOrder, { loading }] = mutationCallback()

  const alert = useAlert()

  useEffect(() => {
    if (items) {
      setOrderItems([...items])
    }
  }, [items])

  const onRomveItem = (item: any) => {
    if (items) {
      let itemsClone = [...items]
      itemsClone = itemsClone.filter((i) => i.id !== item?.id)
      setOrderItems([...itemsClone])
    }
  }

  const displayOrderItems = () => {
    if (orderItems && orderItems.length > 0) {
      return orderItems.map((item) => {
        return (
          <OrderItem
            onRomveItem={(item: any) => onRomveItem(item)}
            key={item.id}
            orderItem={item}
            OrderID={OrderID}
          />
        )
      })
    }
  }

  const onCheckOrder = () => {
    checkOrder({
      url: ApiUrl.Order.CHECK_ORDER,
      body: { orderItems },
      onCompleted(data) {
        setOrderItems([...data.orderItems])
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Fragment>
      <h4 className='mt-5'>Order Items</h4>
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Instock</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{displayOrderItems()}</tbody>
      </Table>
      <ButtonCustom
        type="button"
        loading={loading}
        disabled={loading}
        textloading="Checking..."
        onClick={onCheckOrder}
      >
        Check product in stock
      </ButtonCustom>
    </Fragment>
  )
}

export default OrdeItems
