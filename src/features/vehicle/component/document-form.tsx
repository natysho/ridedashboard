import React, { useState } from 'react'
import { Button, Card, Form, Image } from 'react-bootstrap'

import ModalFileViewer from 'shared/component/modal-file-viewer'
import { useParams } from 'react-router-dom'
import {
  useGetVehicleByIdQuery,
  useUploadVehicleDocumentMutation,
} from '../api/vehicle-api-service'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { VButton } from 'shared/component/button'
import { IconDeviceFloppy } from '@tabler/icons'

function DocumentFrom() {
  const { id: vehicleId } = useParams()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpenModal, setIsOpenedModal] = useState(false)
  const [bolo, setBolo] = useState('')
  const [insurance, setInsurance] = useState('')

  const [isFirst, setIsFirst] = useState(true)
  const [
    uploadDocument,
    { isLoading: uploading },
  ] = useUploadVehicleDocumentMutation()
  const { data, isLoading, refetch } = useGetVehicleByIdQuery(
    vehicleId ? vehicleId : '',
  )

  const [insuranceDate, setInsuranceDate] = useState(
    data?.vehicle?.insurance_certificate_due_date,
  )
  const [boloDate, setBoloDate] = useState(data?.vehicle?.bolo_due_date)

  const onChangeInsuranceFile = (e: any) => {
    setInsurance(e.target.files[0])
  }
  const onChangeBoloFile = (event: any) => {
    // setMyImage(URL.createObjectURL(event.target.files[0]))
    setBolo(event.target.files[0])
  }
  const onSaveDocumentFile = async () => {
    setIsFirst(false)
    if (boloDate && insuranceDate) {
      const formData = new FormData()
      formData.append('insurance', insurance)
      formData.append('bolo', bolo)
      formData.append(
        'insurance_certificate_due_date',
        JSON.stringify(insuranceDate),
      )
      formData.append('bolo_due_date', JSON.stringify(boloDate))
      await uploadDocument({
        file: formData,
        vehicle_id: vehicleId,
      })
      refetch()
    }
  }
  // bolo_due_date
  // insurance_certificate_due_date
  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
    setIsOpenedModal(false)
  }
  const openFile = () => {
    setIsOpenedModal(true)
  }
  const handleClose = () => {
    setIsOpenedModal(false)
  }
  const setInsuranceDateValue = (date) => {
    setIsFirst(false)
    setInsuranceDate(date.target.value)
  }
  const setBoloDateValue = (date) => {
    setIsFirst(false)
    setBoloDate(date.target.value)
    console.log('date.target.value..', date.target.value)
    console.log('date.target.value..', typeof date.target.value)
  }
  return (
    <>
      <Card className="mt-3">
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div> Document </div>
            <div className="d-flex">
              <Button size="sm" onClick={onCollapsed}>
                {isCollapsed ? 'Expand' : 'Collapse'}
              </Button>
            </div>
          </div>
        </Card.Header>

        <Card.Body className={isCollapsed ? 'd-none' : ''}>
          <div className="d-flex justify-content-between">
            <div className="w-50">
              <div className="mb-2  fs-6"> Upload Insurance </div>
              <Card>
                <Card.Header>
                  <Form.Control onChange={onChangeInsuranceFile} type="file" />
                  <Form className="mt-4">
                    <Form.Control
                      type="date"
                      value={insuranceDate}
                      onChange={(date) => setInsuranceDateValue(date)}
                    />

                    {!insuranceDate && !isFirst && (
                      <span className="text-danger">
                        insurance du date is Required
                      </span>
                    )}
                  </Form>
                </Card.Header>
                <Card.Body>
                  <div>
                    <div
                      // onClick={openFile}
                      style={{ cursor: 'pointer', color: 'blue' }}
                      className="mb-2 fs-6"
                    >
                      <a
                        href={`https://safeway-api.herokuapp.com/${data?.vehicle?.insurance?.path}`}
                        target="_blank"
                      >
                        {' '}
                        {data?.vehicle?.insurance?.file_name}
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="mx-3 w-50">
              <div className="mb-2"> Upload Bolo</div>
              <Card>
                <Card.Header>
                  <Form.Control onChange={onChangeBoloFile} type="file" />

                  <Form className="mt-4">
                    <Form.Control
                      type="date"
                      value={boloDate}
                      onChange={(date) => setBoloDateValue(date)}
                    />

                    {!boloDate && !isFirst && (
                      <span className="text-danger">
                        bolo du date is Required
                      </span>
                    )}
                  </Form>
                </Card.Header>
                <Card.Body>
                  <div>
                    <div
                      style={{ cursor: 'pointer', color: 'blue' }}
                      className="mb-2 fs-6"
                      // onClick={openFile}
                    >
                      <a
                        href={`https://safeway-api.herokuapp.com/${data?.vehicle?.bolo?.path}`}
                        target="_blank"
                      >
                        {' '}
                        {data?.vehicle?.bolo?.file_name}
                      </a>
                    </div>
                    <div>
                      {/* <Button
                        onClick={onSaveDrivingLicenseFile}
                        variant="primary"
                      >
                        {data?.driver?.driving_license ? 'Update' : 'Save'}
                      </Button> */}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="mt-4">
            <VButton
              onClick={onSaveDocumentFile}
              variant="primary"
              isLoading={uploading}
            >
              <IconDeviceFloppy />
              {data?.vehicle?.vehicle_id ? 'Update' : 'Save'}
            </VButton>
          </div>
        </Card.Body>
      </Card>
      {isOpenModal && (
        <ModalFileViewer
          showModal={isOpenModal}
          handleClose={handleClose}
          file={{
            filePath:
              'https://egp.ppa.gov.et/po-gw/cms/api/resources/download-attachment/2a077785-2471-405b-9998-2333bc856c1b.pdf',
            fileType: 'pdf',
            fileName: 'Provider.pdf',
          }}
        />
      )}
    </>
  )
}

export default DocumentFrom
