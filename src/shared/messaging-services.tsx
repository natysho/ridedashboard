import React, { useEffect, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
interface messagingServiceProps {
  show: boolean
  message: string
  type: 'success' | 'error'
}
function MessagingServices(props: messagingServiceProps) {
  const [show, setShow] = useState(props.show)
  // const [message, setMessage] = useState(props.message);
  // const [type, setType] = useState(props.type);

  // useEffect(() => {
  //     setMessage(props.message);
  //     setType(props.type)
  // }, [props.type, props.message])
  return (
    <ToastContainer position="top-end" className="mt-2">
      <Toast
        className={props.type === 'success' ? 'bg-success' : 'bg-danger'}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong
            className={
              props.type === 'success'
                ? 'me-auto text-success'
                : 'me-auto text-danger'
            }
          >
            {props.type}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default MessagingServices
