import React, { useState } from 'react'
import { Button, Card, Form, Image } from 'react-bootstrap'
import './provider-from.scss'
import {
  useGetProviderByIdQuery,
  useUploadProviderPassportMutation,
} from '../api/provider-api-services'
import ModalFileViewer from 'shared/component/modal-file-viewer'
import { useParams } from 'react-router-dom'
import { IconDeviceFloppy } from '@tabler/icons'
import { VButton } from 'shared/component/button'

interface DocumentProps {
  provider: any
}
function DocumentFrom(props: DocumentProps) {
  const { id: driverId } = useParams()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpenModal, setIsOpenedModal] = useState(false)
  const [passport, setPassport] = useState('')
  const [drivingLicense, setDrivingLicense] = useState('')

  const [uploadPassport] = useUploadProviderPassportMutation()
  const { data, isLoading, refetch } = useGetProviderByIdQuery(
    driverId ? driverId : '',
  )
  const onChangePassportFile = (e: any) => {
    setPassport(e.target.files[0])
  }
  const onChangeDrivingLicenseFile = (event: any) => {
    // setMyImage(URL.createObjectURL(event.target.files[0]))
    setDrivingLicense(event.target.files[0])
  }
  const onSavePassportFile = async () => {
    const formData = new FormData()
    formData.append('driving_license', drivingLicense)
    formData.append('driver_id', passport)

    await uploadPassport({
      file: formData,
      driver_id: driverId,
    })
    refetch()
  }
  const onSaveDrivingLicenseFile = () => {
    const formData = new FormData()
    formData.append('file', drivingLicense)
    const sendData = {
      file: formData,
      driver_id: driverId,
    }
  }
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
              <div className="mb-2  fs-6">
                {' '}
                Upload your Passport or kebele ID{' '}
              </div>
              <Card>
                <Card.Header>
                  <Form.Control onChange={onChangePassportFile} type="file" />
                </Card.Header>
                <Card.Body>
                  <div>
                    <div
                      // onClick={openFile}
                      style={{ cursor: 'pointer', color: 'blue' }}
                      className="mb-2 fs-6"
                    >
                      <a
                        href={`http://localhost:5000/${data?.driver?.driver_id}`}
                        target="_blank"
                      >
                        {' '}
                        {data?.driver?.driver_id}
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="mx-3 w-50">
              <div className="mb-2"> Upload your Driving License</div>
              <Card>
                <Card.Header>
                  <Form.Control
                    onChange={onChangeDrivingLicenseFile}
                    type="file"
                  />
                </Card.Header>
                <Card.Body>
                  <div>
                    <div
                      style={{ cursor: 'pointer', color: 'blue' }}
                      className="mb-2 fs-6"
                      // onClick={openFile}
                    >
                      <a
                        href={`http://localhost:5000/${data?.driver?.driving_license}`}
                        target="_blank"
                      >
                        {' '}
                        {data?.driver?.driving_license}
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
            <VButton onClick={onSavePassportFile} variant="primary">
              <IconDeviceFloppy />
              {data?.driver?.driver_id ? 'Update' : 'Save'}
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
