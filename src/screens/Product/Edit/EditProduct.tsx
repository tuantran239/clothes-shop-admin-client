import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { useMutation, useQuery } from 'react-hooks-axios'
import { ApiUrl } from '@/constants'
import { useSearchParams } from 'react-router-dom'
import { useChangeEvent } from 'react-hooks-custom'
import { Col, Container, Form, Row } from 'react-bootstrap'
import useModal from '@/hooks/useModal'
import DeleteModal from '@/components/DeleteModal/DeleteModal'
import ButtonCustom from '@/components/ButtonCustom'
import useAlert from '@/hooks/useAlert'

const EditProduct = () => {
  const [product, setProduct] = useState<any>(null)

  const { queryCallback } = useQuery()
  const [getUser, { loading }] = queryCallback()
  const { mutationCallback } = useMutation()
  const [updateUser, { loading: updating }] = mutationCallback()

  const [searchParams] = useSearchParams()

  const {
    value: input,
    onChange,
    setValue
  } = useChangeEvent({
    email: '',
    name: '',
    active: 'false'
  })

  const { displayModal, handleShow, handleClose } = useModal()
  const alert = useAlert()

  useEffect(() => {
    getUser({
      url: ApiUrl.Product.GET_PRODUCT + `/${searchParams.get('id')}`,
      onCompleted(data) {
        setProduct((pre: any) => {
          return { ...pre, ...data.product }
        })
        setValue!!({ ...data.product })
      }
    })
  }, [])

  const onUpdateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser({
      url: ApiUrl.User.UPDATE_USER + `/${searchParams.get('id')}`,
      body: { ...product, ...input },
      method: 'put',
      onCompleted() {
        alert.successToast('Update user successfully!')
      },
      onError() {
        alert.errorToast('Cant update user')
      }
    })
  }

  return (
    <Layout>
      {displayModal({
        component: <DeleteModal url="" handleClose={handleClose} />
      })}
      <Container>
        <Row>
          <Col xl={6} lg={6} className="mx-auto">
            {!loading && (
              <Form onSubmit={onUpdateHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <h6>Name</h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="name"
                    required
                    name="name"
                    defaultValue={input.name}
                    onChange={onChange}
                    disabled={updating}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <h6>Email address</h6>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    required
                    name="email"
                    defaultValue={input.email}
                    onChange={onChange}
                    disabled={updating}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <h6>Active</h6>
                  </Form.Label>
                  <Form.Select
                    name="active"
                    onChange={onChange}
                    required
                    disabled={updating}
                    defaultValue={input.active}
                  >
                    <option value="true">Active</option>
                    <option value="false">Disabled</option>
                  </Form.Select>
                </Form.Group>
                <div className="gap-2">
                  <ButtonCustom
                    onClick={handleShow}
                    variant="danger"
                    disabled={updating}
                  >
                    Delete
                  </ButtonCustom>
                  <ButtonCustom
                    className="ml-2"
                    variant="warning"
                    type="submit"
                    loading={updating}
                    disabled={updating}
                  >
                    Update
                  </ButtonCustom>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default EditProduct
