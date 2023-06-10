import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Image } from 'react-bootstrap'
import {
  IconSquareX,
  IconDeviceFloppy,
  IconTrash,
  IconEdit,
  IconUpload,
} from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import './provider-from.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { Provider } from '../../model/provider'
import { schema } from './form-validation'
import {
  useCreateProviderMutation,
  useUpdateProviderMutation,
} from '../api/provider-api-services'
import SpinnerForPages from 'shared/component/spinner-for-pages'
import { VButton } from 'shared/component/button'
export interface ProviderFormProps {
  viewMode: string
  title: string
  selectedItem?: any
  vehicleId?: any
  selectedItemLoading?: boolean
}
function ProviderForm(props: ProviderFormProps) {
  const { id } = useParams()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(props?.selectedItemLoading)
  const [addNewProvider, { isLoading: creating }] = useCreateProviderMutation()
  const [updateProvider, { isLoading: updating }] = useUpdateProviderMutation()
  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }

  const onCreate: SubmitHandler<Provider> = (newData: Provider) => {
    newData.vehicle_id = props.vehicleId ? props.vehicleId : ''
    addNewProvider(newData)
  }
  const onUpdate: SubmitHandler<Provider> = (updatedData: Provider) => {
    updatedData.vehicle_id = props.selectedItem.vehicle_id
    updateProvider(updatedData)
  }
  const onDelete = () => {}

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Provider>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })
  useEffect(() => {
    if (props.selectedItem) {
      reset(props.selectedItem)
    }
    setIsLoading(props?.selectedItemLoading)
  }, [props.selectedItem, reset, props?.selectedItemLoading])

  return (
    <>
      {isLoading ? (
        <SpinnerForPages />
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div> {props.title}</div>
            <div className="d-flex">
              {/* <Link to='/provider' className='text-black'><IconSquareX /></Link> */}
              <Button size="sm" onClick={onCollapsed}>
                {isCollapsed ? 'Expand' : 'Collapse'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className={isCollapsed ? 'd-none' : ''}>
            <Form
              onSubmit={
                props.viewMode === 'detail'
                  ? handleSubmit(onUpdate)
                  : handleSubmit(onCreate)
              }
            >
              <div className="d-flex mb-4">
                <div className="w-50 ">
                  <Form.Group controlId="formFirstName">
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        First Name
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.first_name ? true : false}
                      {...register('first_name')}
                      type="text"
                      placeholder="enter first name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.first_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="w-50 mx-4">
                  <Form.Group controlId="formLastName">
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        Last Name
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.last_name ? true : false}
                      {...register('last_name')}
                      type="text"
                      placeholder="enter last name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.last_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="w-50 ">
                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      isInvalid={errors?.phone_number ? true : false}
                      {...register('phone_number')}
                      type="text"
                      placeholder="enter phone number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.phone_number?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formEmergencyContactNumber"
                  >
                    <Form.Label>Emergency contact number</Form.Label>
                    <Form.Control
                      {...register('emergency_contact')}
                      type="text"
                      placeholder="enter emergence contact number"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      {...register('email')}
                      type="text"
                      placeholder="enter  email"
                    />
                  </Form.Group>

                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">Gender</Form.Label>
                    </div>
                    <Form.Select
                      isInvalid={errors?.gender ? true : false}
                      {...register('gender')}
                    >
                      <option>Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="d-flex mt-5">
                    <VButton
                      type="submit"
                      disabled={props.viewMode === 'detail'}
                      variant="primary"
                      isLoading={creating}
                    >
                      {' '}
                      <IconDeviceFloppy /> Save
                    </VButton>
                    <VButton
                      type="submit"
                      disabled={props.viewMode === 'new'}
                      className="mx-2"
                      variant="warning"
                      isLoading={updating}
                    >
                      <IconEdit />
                      Update
                    </VButton>
                    <VButton
                      onClick={onDelete}
                      disabled={props.viewMode === 'new'}
                      variant="danger"
                    >
                      <IconTrash />
                      Delete
                    </VButton>
                  </div>
                </div>

                <div className="w-50 mx-4">
                  <Card>
                    <Card.Header>Address</Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-2" controlId="formCity">
                        <div className="form-group required">
                          <Form.Label className="control-label">
                            City
                          </Form.Label>
                        </div>
                        <Form.Control
                          isInvalid={errors?.address?.city ? true : false}
                          {...register('address.city')}
                          type="text"
                          placeholder="enter city"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.address?.city?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formSubCity">
                        <div className="form-group required">
                          <Form.Label className="control-label">
                            SubCity
                          </Form.Label>
                        </div>
                        <Form.Control
                          isInvalid={errors?.address?.sub_city ? true : false}
                          {...register('address.sub_city')}
                          type="text"
                          placeholder="enter SubCity"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.address?.sub_city?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formWoreda">
                        <div className="form-group required">
                          <Form.Label className="control-label">
                            Woreda
                          </Form.Label>
                        </div>
                        <Form.Control
                          isInvalid={errors?.address?.woreda ? true : false}
                          {...register('address.woreda')}
                          type="text"
                          placeholder="enter woreda"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.address?.woreda?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formHouseNumber">
                        <div className="form-group required">
                          <Form.Label className="control-label">
                            House Number
                          </Form.Label>
                        </div>
                        <Form.Control
                          isInvalid={
                            errors?.address?.house_number ? true : false
                          }
                          {...register('address.house_number')}
                          type="text"
                          placeholder="enter house number"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.address?.house_number?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default ProviderForm
