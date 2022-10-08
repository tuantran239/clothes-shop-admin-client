import React, { useState } from 'react'
import { ApiUrl, Role } from '@/constants'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from '../../../components/Layout'
import ButtonCustom from '@/components/ButtonCustom'
import { useChangeEvent } from 'react-hooks-custom'
import { useMutation } from 'react-hooks-axios'
import useAlert from '@/hooks/useAlert'
import { handleError } from '@/utils'

const NewUser = () => {
  const {
    value: input,
    onChange,
    setValue
  } = useChangeEvent({
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: Role.USER
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { mutationCallback } = useMutation()
  const [createUser, { loading }] = mutationCallback(ApiUrl.User.NEW_USER)

  const alert = useAlert()

  const displayRole = () => {
    return Object.keys(Role).map((r) => {
      return (
        <option key={r} value={Role[r]} className="p-2">
          {r}
        </option>
      )
    })
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUser({
      body: input,
      onCompleted() {
        alert.successToast('Create user successfully!')
        setValue!!({
          name: '',
          email: '',
          password: '',
          confirm: '',
          role: Role.ADMIN
        })
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Layout>
      <Container className="my-5">
        <Row>
          <Col xl={6} lg={6} className="mx-auto">
            <h4>Create New User</h4>
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Name</h6>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  disabled={loading}
                  required={true}
                  name="name"
                  value={input.name}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Email address</h6>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  disabled={loading}
                  required={true}
                  name="email"
                  value={input.email}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Role</h6>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  disabled={loading}
                  required={true}
                  name="role"
                  value={input.role}
                  onChange={onChange}
                >
                  {displayRole()}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Password</h6>
                </Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  disabled={loading}
                  required={true}
                  minLength={6}
                  name="password"
                  value={input.password}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Confirm Password</h6>
                </Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  disabled={loading}
                  required={true}
                  pattern={input.password}
                  name="confirm"
                  value={input.confirm}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Show password"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </Form.Group>
              <ButtonCustom
                variant="primary"
                type="submit"
                block={true}
                loading={loading}
              >
                Create
              </ButtonCustom>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default NewUser
