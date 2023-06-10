import { yupResolver } from '@hookform/resolvers/yup'
import { IconEye } from '@tabler/icons'
import React, { useState } from 'react'
import { Button, Card, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../api/auth-api-service'
import { history } from '../history'
import { schema } from './form-validation'
function LoginForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })
  const [signIn, { data, isSuccess, isError, isLoading }] = useLoginMutation()
  const [passwordShown, setPasswordShown] = useState(false)

  const onLogin = async (user: any) => {
    await signIn(user)
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  return (
    <div
      style={{ height: '100vh', backgroundColor: '#fafbf6' }}
      className="d-flex justify-content-center align-items-center "
    >
      <div className="w-50 d-flex d-flex justify-content-center align-items-center">
        <div className="w-50 mx-4">
          <div style={{ textAlign: 'center' }}>
            <h4>Login</h4>
          </div>
          <div>
            <Card className=" p-4 rounded w-100">
              <Form onSubmit={handleSubmit(onLogin)}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-blue">Email</Form.Label>
                  <Form.Control
                    isInvalid={errors?.email ? true : false}
                    {...register('email')}
                    type="text"
                    placeholder="enter username"
                  ></Form.Control>
                  <Form.Control.Feedback>
                    {errors?.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      {...register('password', { required: true })}
                      type={passwordShown ? 'text' : 'password'}
                      isInvalid={errors?.password ? true : false}
                      placeholder="enter password"
                      aria-describedby="basic-addon1"
                    ></Form.Control>
                    <InputGroup.Text id="basic-addon1">
                      <div
                        onClick={togglePassword}
                        style={{ cursor: 'pointer' }}
                      >
                        <IconEye style={{ height: 14, width: 14 }} />
                      </div>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {isError && (
                  <span className="text-danger mb-2">
                    Incorrect username or password
                  </span>
                )}

                <Button className="w-100" variant="primary" type="submit">
                  {isLoading ? (
                    <Spinner
                      style={{ height: '10px', width: '10px' }}
                      animation="border"
                      role="status"
                    ></Spinner>
                  ) : (
                    ''
                  )}{' '}
                  Login
                </Button>
                <div className="mt-4 mb-0">
                  <Link
                    to="/"
                    style={{
                      fontSize: '12px',
                      textDecoration: 'none',
                      textAlign: 'center',
                    }}
                  >
                    <p> I forgot my password</p>
                  </Link>
                </div>
              </Form>
            </Card>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default LoginForm
