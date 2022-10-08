import React, { Fragment, useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useChangeEvent } from 'react-hooks-custom'
import { ApiUrl, OrderState } from '@/constants'
import { useMutation } from 'react-hooks-axios'
import ButtonCustom from '@/components/ButtonCustom'
import useAlert from '@/hooks/useAlert'
import { handleError } from '@/utils'

interface PropsType {
  state: any
  id: any
}

const OrderStateComponet = ({ state, id }: PropsType) => {
  const {
    value: input,
    onChange,
    setValue
  } = useChangeEvent({
    newState: ''
  })

  useEffect(() => {
    if (state) {
      setValue!!({ newState: state })
    }
  }, [state])

  const { mutationCallback } = useMutation()
  const [updateOrderState, { loading }] = mutationCallback()

  const alert = useAlert()

  const displayOrderState = () => {
    return Object.keys(OrderState).map((key: any) => {
      return <option value={OrderState[key]}>{key}</option>
    })
  }

  const onUpdateOrderStateHandler = () => {
    updateOrderState({
      url: `${ApiUrl.Order.UPDATE_ORDER_STATE}/${id}`,
      body: { ...input, state },
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
    <Container className="px-0 my-5">
      <Row>
        <Col xl={6} lg={6}>
          <h4>Order State</h4>
          <Form.Select
            defaultValue={input.newState}
            onChange={onChange}
            disabled={loading}
            name="newState"
          >
            <option disabled={true} selected>
              Order State
            </option>
            {displayOrderState()}
          </Form.Select>
          <ButtonCustom
            className="mt-2"
            variant="warning"
            type="button"
            loading={loading}
            disabled={loading}
            onClick={onUpdateOrderStateHandler}
          >
            Update
          </ButtonCustom>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderStateComponet
