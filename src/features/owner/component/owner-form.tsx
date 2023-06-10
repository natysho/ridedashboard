import { yupResolver } from '@hookform/resolvers/yup'
import { IconDeviceFloppy, IconEdit, IconTrash } from '@tabler/icons'
import { Owner } from 'features/model/owner'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { VButton } from 'shared/component/button'
import SpinnerForPages from 'shared/component/spinner-for-pages'
import {
  useCreateOwnerMutation,
  useUpdateOwnerMutation,
} from '../api/owner-api-service'
import { schema } from './form-validation'
export interface OwnerFormProps {
  viewMode: string
  title: string
  selectedItem?: any
  selectedItemLoading?: boolean
}
function OwnerForm(props: OwnerFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Owner>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [isLoading, setIsLoading] = useState(props?.selectedItemLoading)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const [addNewOwner, { isLoading: creating }] = useCreateOwnerMutation()
  const [updateOwner, { isLoading: updating }] = useUpdateOwnerMutation()

  const onCreate: SubmitHandler<Owner> = (newOwner: Owner) => {
    addNewOwner(newOwner)
  }

  const onUpdate: SubmitHandler<Owner> = (updatedOwner: Owner) => {
    console.log(updatedOwner)
    updateOwner(updatedOwner)
  }

  const onDelete = () => {}
  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }

  useEffect(() => {
    if (props.selectedItem) {
      reset(props.selectedItem)
    }
    setIsLoading(props?.selectedItemLoading)
  }, [props.selectedItem, reset, props?.selectedItemLoading])

  return (
    // <>
    //   <Card>
    //     <Card.Header className="d-flex justify-content-between">
    //       <div> {props.title}</div>
    //       <div className="d-flex">
    //         {/* <Link to='/provider' className='text-black'><IconSquareX /></Link> */}
    //         <Button size="sm" onClick={onCollapsed}>
    //           {isCollapsed ? 'Expand' : 'Collapse'}
    //         </Button>
    //       </div>
    //     </Card.Header>
    //     <Card.Body className={isCollapsed ? 'd-none' : ''}>
    //       <Form
    //         onSubmit={
    //           props.viewMode === 'detail'
    //             ? handleSubmit(onUpdate)
    //             : handleSubmit(onCreate)
    //         }
    //       >
    //         <div className="d-flex mb-4">
    //           <div className="w-50 ">
    //             <Form.Group controlId="formName">
    //               <div className="form-group required">
    //                 <Form.Label className="control-label">Name</Form.Label>
    //               </div>
    //               <Form.Control
    //                 isInvalid={errors?.name ? true : false}
    //                 {...register('name')}
    //                 type="text"
    //                 placeholder="enter  name"
    //               />
    //               <Form.Control.Feedback type="invalid">
    //                 {errors?.name?.message}
    //               </Form.Control.Feedback>
    //             </Form.Group>
    //           </div>

    //           <div className="w-50 mx-4">
    //             <Form.Group className="mb-3" controlId="formPhoneNumber">
    //               <Form.Label>Phone number</Form.Label>
    //               <Form.Control
    //                 isInvalid={errors?.phone_number ? true : false}
    //                 {...register('phone_number')}
    //                 type="text"
    //                 placeholder="enter phone number"
    //               />
    //               <Form.Control.Feedback type="invalid">
    //                 {errors?.phone_number?.message}
    //               </Form.Control.Feedback>
    //             </Form.Group>
    //           </div>
    //         </div>
    //         <div className="d-flex mb-4">
    //           <div className="w-50 ">
    //             <Form.Group controlId="formEmail">
    //               <div className="form-group required">
    //                 <Form.Label className="control-label">Email</Form.Label>
    //               </div>
    //               <Form.Control
    //                 isInvalid={errors?.email ? true : false}
    //                 {...register('email')}
    //                 type="text"
    //                 placeholder="enter  email"
    //               />
    //               <Form.Control.Feedback type="invalid">
    //                 {errors?.email?.message}
    //               </Form.Control.Feedback>
    //             </Form.Group>
    //           </div>

    //           <div className="w-50 mx-4">
    //             <Form.Group className="mb-3" controlId="formGender">
    //               <Form.Label>Gender</Form.Label>
    //               <Form.Select
    //                 isInvalid={errors?.gender ? true : false}
    //                 {...register('gender')}
    //               >
    //                 <option value="">Select Gender</option>
    //                 <option value="Male">Male</option>
    //                 <option value="Female">Female</option>
    //               </Form.Select>
    //               <Form.Control.Feedback type="invalid">
    //                 {errors?.gender?.message}
    //               </Form.Control.Feedback>
    //             </Form.Group>
    //           </div>
    //         </div>
    //         <div className="d-flex mt-5">
    //           <Button
    //             type="submit"
    //             disabled={props.viewMode === 'detail'}
    //             variant="primary"
    //           >
    //             {' '}
    //             <IconDeviceFloppy /> Save
    //           </Button>
    //           <Button
    //             type="submit"
    //             disabled={props.viewMode === 'new'}
    //             className="mx-2"
    //             variant="warning"
    //           >
    //             <IconEdit />
    //             Update
    //           </Button>
    //           <Button
    //             onClick={onDelete}
    //             disabled={props.viewMode === 'new'}
    //             variant="danger"
    //           >
    //             <IconTrash />
    //             Delete
    //           </Button>
    //         </div>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    // </>

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
                      aria-placeholder="basic-phone"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.phone_number?.message}
                    </Form.Control.Feedback>
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

                  {/* <Form.Group
                  className="mb-3"
                  controlId="formEmergencyContactNumber"
                >
                  <Form.Label>Emergency contact number</Form.Label>
                  <Form.Control
                    {...register('emergencyContactNumber')}
                    type="text"
                    placeholder="enter emergence contact number"
                  />
                </Form.Group> */}

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      {...register('email')}
                      type="text"
                      placeholder="enter email"
                    />
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
                      isLoading={false}
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
                          placeholder="enter subCity"
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

export default OwnerForm
