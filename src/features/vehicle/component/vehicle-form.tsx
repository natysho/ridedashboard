import { yupResolver } from '@hookform/resolvers/yup'
import { IconDeviceFloppy, IconEdit, IconTrash } from '@tabler/icons'

import { Vehicle } from 'features/model/vehicle'

import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { VButton } from 'shared/component/button'
import SpinnerForPages from 'shared/component/spinner-for-pages'
import {
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
} from '../api/vehicle-api-service'
import { vehicleSchema } from './from-validation'
interface VehicleFormProps {
  viewMode: string
  title: string
  selectedItem?: any
  ownerId?: string
  selectedItemLoading?: boolean
}
function VehicleForm(props: VehicleFormProps) {
  const [isLoading, setIsLoading] = useState(props?.selectedItemLoading)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [addNewVehicle, { isLoading: creating }] = useCreateVehicleMutation()
  const [updateVehicle, { isLoading: updating }] = useUpdateVehicleMutation()

  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Vehicle>({
    resolver: yupResolver(vehicleSchema),
    mode: 'onBlur',
  })

  const onCreate: SubmitHandler<Vehicle> = (newData: Vehicle) => {
    console.log('....', newData)
    newData.owner_id = props?.ownerId ? props?.ownerId : ''
    addNewVehicle(newData)
  }

  const onUpdate: SubmitHandler<Vehicle> = (updatedData: Vehicle) => {
    console.log('....updatedData..', updatedData)
    updatedData.owner_id = props.selectedItem.owner_id
    updatedData.id = props.selectedItem.id
    updateVehicle(updatedData)
  }
  const onDelete = () => {}

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
              <Button size="sm" onClick={onCollapsed}>
                {isCollapsed ? 'Expand' : 'Collapse'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className={isCollapsed ? 'd-none' : ''}>
            <Form
              onSubmit={
                props.viewMode === 'new'
                  ? handleSubmit(onCreate)
                  : handleSubmit(onUpdate)
              }
            >
              <div className="d-flex mb-4">
                <div className="w-50">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">Model</Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.model ? true : false}
                      {...register('model')}
                      type="text"
                      placeholder="enter model"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.model?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="w-50 mx-4">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">Code</Form.Label>
                    </div>
                    <Form.Select
                      isInvalid={errors?.code ? true : false}
                      {...register('code')}
                    >
                      <option value="">select code</option>
                      <option>A.A</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.code?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="w-50">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        Plate number
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.plate_number ? true : false}
                      {...register('plate_number')}
                      type="text"
                      placeholder="enter plate number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.plate_number?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="w-50 mx-4">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">Color</Form.Label>
                    </div>
                    <Form.Select
                      isInvalid={errors?.color ? true : false}
                      {...register('color')}
                    >
                      <option value="">select care color</option>
                      <option>Green</option>
                      <option>Blue</option>
                      <option>Black</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.color?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="w-50">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        Vehicle Category
                      </Form.Label>
                    </div>
                    <Form.Select
                      isInvalid={errors?.vehicle_category ? true : false}
                      {...register('vehicle_category')}
                    >
                      <option value="">select vehicle category</option>
                      <option>Taxi</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.vehicle_category?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="w-50 mx-4">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        Vehicle Type
                      </Form.Label>
                    </div>
                    <Form.Select
                      isInvalid={errors?.vehicle_type ? true : false}
                      {...register('vehicle_type')}
                    >
                      <option value="">select vehicle type</option>
                      <option>Economy</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.vehicle_type?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="w-50">
                  <Form.Group>
                    <div className="form-group required">
                      <Form.Label className="control-label">
                        Capacity
                      </Form.Label>
                    </div>
                    <Form.Control
                      isInvalid={errors?.capacity ? true : false}
                      {...register('capacity')}
                      type="text"
                      placeholder="enter capacity number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.capacity?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                {/* <div className="w-50 d-flex mx-4">
               <div className="w-50">
                 <Form.Group>
                   <div className="form-group required">
                     <Form.Label className="control-label">
                       Bolo Due Date
                     </Form.Label>
                   </div>
                   <Form.Control
                     isInvalid={errors?.bolo_due_date ? true : false}
                     {...register('bolo_due_date')}
                     type="date"
                   />
                   <Form.Control.Feedback type="invalid">
                     {errors?.bolo_due_date?.message}
                   </Form.Control.Feedback>
                 </Form.Group>
               </div>
 
               <div className="w-50 mx-4">
                 <Form.Group>
                   <div className="form-group required">
                     <Form.Label className="control-label">
                       Insurance Due Date
                     </Form.Label>
                   </div>
                   <Form.Control
                     isInvalid={
                       errors?.insurance_certificate_due_date ? true : false
                     }
                     {...register('insurance_certificate_due_date')}
                     type="date"
                   />
                   <Form.Control.Feedback type="invalid">
                     {errors?.insurance_certificate_due_date?.message}
                   </Form.Control.Feedback>
                 </Form.Group>
               </div>
             </div> */}
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

export default VehicleForm
