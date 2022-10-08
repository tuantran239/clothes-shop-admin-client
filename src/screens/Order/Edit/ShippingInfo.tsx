import React, { Fragment, useEffect } from 'react'
import ButtonCustom from '@/components/ButtonCustom'
import { ApiUrl } from '@/constants'
import useAlert from '@/hooks/useAlert'
import { handleError } from '@/utils'
import { Table, Form } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import { useChangeEvent } from 'react-hooks-custom'

interface PropsType {
  shippingInfo: any
  id: any
}

const ShippingInfo = ({ shippingInfo, id }: PropsType) => {
  const {
    value: input,
    onChange,
    setValue
  } = useChangeEvent({
    fullname: shippingInfo?.fullname || '',
    email: shippingInfo?.email || '',
    phone: shippingInfo?.phone || '',
    address: shippingInfo?.address || ''
  })

  const { mutationCallback } = useMutation()
  const [updateShippingInfo, { loading }] = mutationCallback()

  const alert = useAlert()

  useEffect(() => {
    setValue!!({
      fullname: shippingInfo?.fullname || '',
      email: shippingInfo?.email || '',
      phone: shippingInfo?.phone || '',
      address: shippingInfo?.address || ''
    })
  }, [shippingInfo])

  const onUpdtaeShiipingInfo = () => {
    console.log(input)
    updateShippingInfo({
      body: { shippingInfo: input },
      url: ApiUrl.Order.UPDATE_ORDER + `/${id}`,
      method: 'put',
      onCompleted() {
        alert.successToast('Update successfully!')
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Fragment>
      <h4 className='mt-5'>Shipping Info</h4>
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {' '}
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Fullname"
                required={true}
                name="fullname"
                value={input.fullname}
                onChange={onChange}
                disabled={loading}
              />
            </td>
            <td>
              {' '}
              <Form.Control
                className="mb-2"
                type="email"
                placeholder="Email address"
                required={true}
                name="email"
                value={input.email}
                onChange={onChange}
                disabled={loading}
              />
            </td>
            <td>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="xxxxxxxxxx"
                required={true}
                name="phone"
                value={input.phone}
                onChange={onChange}
                disabled={loading}
              />
            </td>
            <td>
              {' '}
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="address, city, country"
                required={true}
                name="address"
                value={input.address}
                onChange={onChange}
                disabled={loading}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <ButtonCustom
        variant="warning"
        type="submit"
        loading={loading}
        disabled={loading}
        onClick={onUpdtaeShiipingInfo}
      >
        Update
      </ButtonCustom>
    </Fragment>
  )
}

export default ShippingInfo
