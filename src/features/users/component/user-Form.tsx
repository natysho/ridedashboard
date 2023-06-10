import { yupResolver } from '@hookform/resolvers/yup'
import { IconDeviceFloppy, IconEdit, IconTrash } from '@tabler/icons'
import { RoleTypes } from 'features/model/role'
import { User, UserTypes } from 'features/model/user'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../api/user-api-services'
import { schema } from './from-validation'
import Select from 'react-select'
import SpinnerForPages from 'shared/component/spinner-for-pages'
import { VButton } from 'shared/component/button'
interface UserFormProps {
  viewMode: string
  title: string
  selectedItem?: any
  selectedItemLoading?: boolean
}
function UserForm(props: UserFormProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [addNewUser, { isLoading: creating }] = useCreateUserMutation()
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation()
  const [isLoading, setIsLoading] = useState(props?.selectedItemLoading)

  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }

  const onCreate = (newData: any) => {
    addNewUser(newData)
  }
  const onUpdate = (updatedData: any) => {
    updateUser(updatedData)
  }
  const onDelete = () => {}

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      is_active: true,
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  useEffect(() => {
    if (props.selectedItem) {
      reset(props.selectedItem)
    }
    setIsLoading(props?.selectedItemLoading)
  }, [props.selectedItem, reset, props.selectedItemLoading])

  const roleList = [
    {
      value: 'Admin',
      label: 'Admin',
    },
    {
      value: 'Driver',
      label: 'Driver',
    },
  ]
  return (
    <>
      {isLoading ? (
        <SpinnerForPages />
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div> {props.title}</div>
            <div className="d-flex">
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
                <div className="w-50">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        First Name
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.first_name ? true : false}
                      {...register('first_name')}
                      type="text"
                      placeholder="enter care First Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.first_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="w-50 mx-4">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        Last Name
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.last_name ? true : false}
                      {...register('last_name')}
                      placeholder="enter last name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.last_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="w-50">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">Email</Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.email ? true : false}
                      {...register('email')}
                      type="text"
                      placeholder="enter email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="w-50 mx-4">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        Phone Number
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.phone_number ? true : false}
                      {...register('phone_number')}
                      placeholder="enter phone number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.phone_number?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="w-50">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        User Type
                      </Form.Label>
                    </div>
                    <Form.Select
                      isInvalid={errors?.user_type ? true : false}
                      {...register('user_type')}
                    >
                      <option>Select user type</option>
                      {UserTypes.map((user: string) => {
                        return (
                          <option key={user} value={user}>
                            {user}
                          </option>
                        )
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.user_type?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="w-50 mx-4">
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

                  {/* <div className="w-25 mx-4">
                    <Form.Group>
                      <div className="form-group required">
                        <Form.Label className="control-label">
                          Is Active
                        </Form.Label>
                      </div>
                      <Form.Check
                        isInvalid={errors?.is_active ? true : false}
                        {...register('is_active')}
                      />
                    </Form.Group>
                  </div> */}
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="w-50">
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
                </div>

                <div className="w-50 mx-4">
                  {/* <Controller
                    name="roles"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} isMulti options={roleList} />
                    )}
                  /> */}
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">Roles</Form.Label>
                    </div>
                    {/* <Select isMulti options={roleList}></Select> */}
                    <Form.Select
                      multiple
                      isInvalid={errors?.roles ? true : false}
                      {...register('roles')}
                    >
                      {RoleTypes.map((role: string) => {
                        return (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        )
                      })}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex">
                <VButton
                  type="submit"
                  disabled={props.viewMode === 'detail'}
                  variant="primary"
                  isLoading={creating}
                >
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
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default UserForm
