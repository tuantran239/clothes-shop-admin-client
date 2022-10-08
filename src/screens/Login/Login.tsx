import React, { useState, useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import { useChangeEvent } from 'react-hooks-custom'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../../components/ButtonCustom'
import { ApiUrl, RouteUrl } from '../../constants'
import useAlert from '../../hooks/useAlert'
import { handleError } from '../../utils'

const Login = () => {
  const isCheckMeOut = JSON.parse(
    localStorage.getItem('isCheckMeOut') as string
  )
  const authInfo = JSON.parse(localStorage.getItem('authInfo') as string)
  const { value: input, onChange } = useChangeEvent({
    email: authInfo?.email || '',
    password: authInfo?.password || ''
  })
  const [isCheck, setIsCheck] = useState(isCheckMeOut || false)

  const { mutationCallback } = useMutation()
  const [login, { loading }] = mutationCallback(ApiUrl.Auth.LOGIN)

  const alert = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    if (isCheck) {
      localStorage.setItem('authInfo', JSON.stringify(input))
    }
  }, [input])

  const handleCheck = () => {
    if (isCheckMeOut) {
      localStorage.removeItem('isCheckMeOut')
      localStorage.removeItem('authInfo')
      setIsCheck(false)
    } else {
      localStorage.setItem('authInfo', JSON.stringify(input))
      localStorage.setItem('isCheckMeOut', JSON.stringify(true))
      setIsCheck(true)
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({
      body: input,
      onCompleted() {
        navigate(RouteUrl.HOME)
        window.location.reload()
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <div className="h-screen bg-gray-800 d-flex flex-column justify-content-center">
      <Container>
        <Row>
          <Col
            xl={5}
            lg={5}
            md={7}
            sm={9}
            xs={9}
            className="px-4 py-4 mx-auto rounded auto bg-light"
          >
            <Form onSubmit={onSubmitHandler}>
              <h1>Login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  required={true}
                  value={input.email}
                  onChange={onChange}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  required={true}
                  value={input.password}
                  onChange={onChange}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  defaultChecked={isCheck}
                  onClick={handleCheck}
                  type="checkbox"
                  label="Check me out"
                  disabled={loading}
                />
              </Form.Group>
              <ButtonCustom
                block={true}
                loading={loading}
                textloading="Handling..."
                disabled={loading}
              >
                Login
              </ButtonCustom>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
