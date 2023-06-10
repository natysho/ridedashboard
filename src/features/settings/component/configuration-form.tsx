import { yupResolver } from '@hookform/resolvers/yup'
import { IconDeviceFloppy, IconEdit, IconTrash } from '@tabler/icons'
import { Configuration } from 'features/model/Configurtion'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import {
  useListConfigurationQuery,
  useUpdateConfigurationMutation,
} from '../api/configuration-api-services'

import { schema } from './form-validation'

function ConfigurationForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Configuration>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [isCollapsed, setIsCollapsed] = useState(false)

  const { data, isLoading } = useListConfigurationQuery('')
  const [updateConfiguration] = useUpdateConfigurationMutation()

  const onUpdate: SubmitHandler<Configuration> = (
    updatedConfiguration: Configuration,
  ) => {
    console.log(updatedConfiguration)
    updateConfiguration(updatedConfiguration)
  }

  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }
  useEffect(() => {
    reset(data?.items)
  }, [data])
  const check = false
  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div>Setting Configuration</div>
            <div className="d-flex">
              {/* <Link to='/provider' className='text-black'><IconSquareX /></Link> */}
              <Button size="sm" onClick={onCollapsed}>
                {isCollapsed ? 'Expand' : 'Collapse'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className={isCollapsed ? 'd-none' : ''}>
            <Form onSubmit={handleSubmit(onUpdate)}>
              <div className="d-flex mb-4">
                <div style={{ width: '33%' }}>
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        {' '}
                        Commission
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.commission ? true : false}
                      {...register('commission')}
                      type="text"
                      placeholder="enter commission"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.commission?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div style={{ width: '33%' }} className="mx-4">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        Initial Fare
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.initial_fare ? true : false}
                      {...register('initial_fare')}
                      type="text"
                      placeholder="enter iInitial Fare"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.initial_fare?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div style={{ width: '33%' }}>
                  <Form.Group className="mb-3">
                    <Form.Label>Radius</Form.Label>
                    <Form.Control
                      isInvalid={errors?.radius ? true : false}
                      {...register('radius')}
                      type="text"
                      placeholder="enter  Radius"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.radius?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="w-50 ">
                  <Card>
                    <Card.Header>Discount</Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-2">
                        <div className="form-group required">
                          <Form.Label className="control-label">
                            Taxi
                          </Form.Label>
                        </div>
                        <Form.Control
                          isInvalid={errors?.discount?.taxi ? true : false}
                          {...register('discount.taxi')}
                          type="text"
                          placeholder="enter discount for taxi"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.discount?.taxi?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="form-group required">
                          <Form.Label className="control-label">
                            Track
                          </Form.Label>
                        </div>
                        <Form.Control
                          isInvalid={errors?.discount?.track ? true : false}
                          {...register('discount.track')}
                          type="text"
                          placeholder="enter discount for Track"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.discount?.track?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </div>

                <div className="w-50 mx-4">
                  <Card>
                    <Card.Header>Award</Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-2">
                        <div className="form-group required">
                          <Form.Label className="control-label">
                            Point
                          </Form.Label>
                        </div>
                        <Form.Control
                          isInvalid={errors?.award?.point ? true : false}
                          {...register('award.point')}
                          type="text"
                          placeholder="enter award"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.award?.point?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <Button type="submit" className="mx-2" variant="warning">
                <IconEdit />
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default ConfigurationForm
