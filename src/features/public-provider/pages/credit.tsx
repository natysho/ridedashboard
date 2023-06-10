import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import CreditHistory from './credit-history'

function Credit() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }

  return (
    <Card className="mt-2">
      <Card.Header className="d-flex justify-content-between">
        <div>Credit Detail</div>
        {!isCollapsed && <div> Balance 200 Birr</div>}
        <div></div>
        <div className="d-flex">
          {/* <Link to='/provider' className='text-black'><IconSquareX /></Link> */}
          <Button size="sm" onClick={onCollapsed}>
            {isCollapsed ? 'Expand' : 'Collapse'}
          </Button>
        </div>
      </Card.Header>
      <Card.Body className={isCollapsed ? 'd-none' : ''}>
        <CreditHistory />
      </Card.Body>
    </Card>
  )
}

export default Credit
