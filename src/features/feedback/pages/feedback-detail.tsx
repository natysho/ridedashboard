import { IconTrash } from '@tabler/icons'
import { Provider } from 'features/model/provider'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { VButton } from 'shared/component/button'
import SpinnerForPages from 'shared/component/spinner-for-pages'
import {
  useDeleteFeedbackMutation,
  useDetailFeedbackQuery,
} from '../api/feadback-api-services'

import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'
function FeedbackDetail() {
  const { id } = useParams()
  const { data, isLoading } = useDetailFeedbackQuery(id ? id : '')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [
    deleteFeedback,
    { isError, isLoading: deleting },
  ] = useDeleteFeedbackMutation()

  const navigate = useNavigate()

  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }
  const dateFormater = (date) => {
    if (date) {
      const data = new Date(date)
      // Results below assume UTC timezone - your results may vary
      const result = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }).format(data)
      // Specify default date formatting for language (locale)
      // console.log(new Intl.DateTimeFormat('en-US').format(data))
      return result
    }
  }
  const onDelete = async () => {
    await deleteFeedback(data.item.id)
    if (!isError) {
      navigate('/feedback')
    }
  }
  return (
    <>
      {isLoading ? (
        <SpinnerForPages />
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div> Feedback Detail</div>
            <div className="d-flex">
              {/* <Link to='/provider' className='text-black'><IconSquareX /></Link> */}
              <Button size="sm" onClick={onCollapsed}>
                {isCollapsed ? 'Expand' : 'Collapse'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className={isCollapsed ? 'd-none' : ''}>
            <div className="border mt-2 mx-2 pt-2">
              {/* model */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>Name</div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {data?.item?.name}
                </div>
              </div>

              {/* email */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>Email </div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {data.item?.email}
                </div>
              </div>
              {/* phone */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>
                  Phone Number{' '}
                </div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {data.item?.phone_number}
                </div>
              </div>

              {/* subject */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>Subject </div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {data.item?.subject}
                </div>
              </div>

              {/* description */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>
                  Description{' '}
                </div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {data.item?.description}
                </div>
              </div>

              {/* Created_at */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>
                  Created Date{' '}
                </div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {dateFormater(data.item?.created_at)}
                </div>
              </div>

              {/* updated_at */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>
                  Updated Date{' '}
                </div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {dateFormater(data.item?.updated_at)}
                </div>
              </div>
            </div>
            <VButton onClick={onDelete} className="mt-4" variant="danger">
              <IconTrash />
              Delete
            </VButton>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default FeedbackDetail
