import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-hooks-axios'
import { ApiUrl } from '@/constants'
import { useSearchParams } from 'react-router-dom'
import ShippingInfo from './ShippingInfo'
import OrdeItems from './OrdeItems'
import OrderState from './OrderState'

const EditOrder = () => {
  const [order, setOrder] = useState<any>(null)

  const { queryCallback } = useQuery()
  const [getOrder, { loading }] = queryCallback()

  const [searchParams] = useSearchParams()

  useEffect(() => {
    getOrder({
      url: ApiUrl.Order.GET_ORDER + `/${searchParams.get('id')}`,
      onCompleted(data) {
        setOrder(data.order)
      }
    })
  }, [])

  return (
    <Layout>
      <Container>
        <Row>
          <Col xl={12} lg={12} className="mx-auto">
            <ShippingInfo
              shippingInfo={order?.shippingInfo}
              id={order?.id}
            />
            <OrdeItems OrderID={order?.OrderID} items={order?.orderItems} />
            <OrderState state={order?.state} id={order?.id} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default EditOrder
