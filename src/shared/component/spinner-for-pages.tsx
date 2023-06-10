import React from 'react'
import { Spinner } from 'react-bootstrap'
function SpinnerForPages() {
  return (
    <div className="h-100 d-flex justify-content-center">
      <div className="align-self-center ">
        <Spinner variant="primary" animation={'border'} />
      </div>
    </div>
  )
}

export default SpinnerForPages
