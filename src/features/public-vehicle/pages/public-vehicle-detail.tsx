import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useParams } from 'react-router-dom'
import SpinnerForPages from 'shared/component/spinner-for-pages'
import { useGetPublicVehicleOwnerByIdQuery } from '../api/public-vehicle-api-services'
import styles from './style.module.css'
interface PublicVehicleDetailProps {
  selectedVehicle: any
  selectedVehicleLoading: boolean
}
function PublicVehicleDetail(props: PublicVehicleDetailProps) {
  const [selectedVehicle, setSelectedVehicle] = useState(props.selectedVehicle)
  const [skip, setSkip] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { data, isLoading } = useGetPublicVehicleOwnerByIdQuery(
    props?.selectedVehicle?.vehicle?.owner_id,
    { skip: skip },
  )

  useEffect(() => {
    setSelectedVehicle(props.selectedVehicle)
    if (props.selectedVehicle) {
      setSkip(false)
    }
  }, [props.selectedVehicle])

  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }

  return (
    <>
      {isLoading || props.selectedVehicleLoading ? (
        <SpinnerForPages />
      ) : (
        <Card className=" h-100">
          <Card.Header className="d-flex justify-content-between">
            <div> Vehicle Detail</div>
            <div className="d-flex">
              {/* <Link to='/provider' className='text-black'><IconSquareX /></Link> */}
              <Button size="sm" onClick={onCollapsed}>
                {isCollapsed ? 'Expand' : 'Collapse'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className={isCollapsed ? 'd-none' : ''}>
            <div className="d-flex ">
              <div style={{ width: '65%' }} className="border mt-2 mx-2 pt-2">
                {/* model */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>Model</div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.model}
                  </div>
                </div>

                {/* Code */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>Code</div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.code}
                  </div>
                </div>
                {/* Code */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>
                    Plate Number
                  </div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.plate_number}
                  </div>
                </div>
                {/* Color */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>Color</div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.color}
                  </div>
                </div>
                {/* category */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}> Category</div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.vehicle_category}
                  </div>
                </div>
                {/* type */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>Type </div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.vehicle_type}
                  </div>
                </div>
                {/* status */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>Status </div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.is_active
                      ? 'Active'
                      : 'Inactive'}
                  </div>
                </div>
                {/* bolo_due_date */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>
                    Bolo Due Date{' '}
                  </div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.bolo_due_date}
                  </div>
                </div>
                {/* insurance_certificate_due_date */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>
                    Insurance Certificate Due Date{' '}
                  </div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedVehicle?.vehicle?.insurance_certificate_due_date}
                  </div>
                </div>
                {/* insurance_certificate_due_date */}
                {selectedVehicle?.vehicle?.bolo && (
                  <div className="p-2 pt-0 pb-0 d-flex">
                    <div className={`p-2 w-25 ${styles.listKey} `}>Bolo</div>
                    <div className={`p-2 w-75 ${styles.list} `}>
                      <div
                        style={{ cursor: 'pointer', color: 'blue' }}
                        className="mb-2 fs-6"
                        // onClick={openFile}
                      >
                        <a
                          href={`https://safeway-api.herokuapp.com/${selectedVehicle?.vehicle?.bolo?.path}`}
                          target="_blank"
                        >
                          {' '}
                          {selectedVehicle?.vehicle?.bolo?.file_name}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {/* insurance */}
                {selectedVehicle?.vehicle?.insurance && (
                  <div className="p-2 pt-0 pb-0 d-flex">
                    <div className={`p-2 w-25 ${styles.listKey} `}>
                      Insurance Certificate
                    </div>
                    <div className={`p-2 w-75 ${styles.list} `}>
                      <div
                        // onClick={openFile}
                        style={{ cursor: 'pointer', color: 'blue' }}
                        className="mb-2 fs-6"
                      >
                        <a
                          href={`https://safeway-api.herokuapp.com/${selectedVehicle?.vehicle?.insurance?.path}`}
                          target="_blank"
                        >
                          {' '}
                          {selectedVehicle?.vehicle?.insurance?.file_name}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ width: '35%' }} className="border mt-2 mx-2 pt-2">
                <h5 className="mx-2">Owner</h5>
                {/* Name */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-100 ${styles.listKey} `}>
                    Name: {data?.owner.first_name} {data?.owner.last_name}
                  </div>
                </div>
                {/* Phone */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-100 ${styles.listKey} `}>
                    Phone: {data?.owner.phone_number}
                  </div>
                </div>

                {/* Gender */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-100 ${styles.listKey} `}>
                    Gender: {data?.owner.gender}
                  </div>
                </div>
                {/* Email */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-100 ${styles.listKey} `}>
                    Email: {data?.owner.email}
                  </div>
                </div>
                {/* Address */}
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-100 ${styles.listKey} `}>
                    <span>City :{data?.owner.address?.city}</span>
                    <br />
                    <span>subCity :{data?.owner.address?.sub_city}</span> <br />
                    <span>woreda :{data?.owner.address?.woreda}</span> <br />
                    <span>
                      House Number : {data?.owner.address?.house_number}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default PublicVehicleDetail
