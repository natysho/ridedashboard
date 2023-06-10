import { Provider } from 'features/model/provider'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import SpinnerForPages from 'shared/component/spinner-for-pages'
import { useGetPublicProviderByIdQuery } from '../api/public-provider-services'
import Credit from './credit'
import styles from './style.module.css'
interface PublicProviderDetailProps {
  selectedProvider: any
  selectedProviderLoading: boolean
}
function PublicProviderDetail(props: PublicProviderDetailProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider>(
    props.selectedProvider,
  )
  const [skip, setSkip] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  // const { data, isLoading } = useGetPublicProviderByIdQuery(
  //   props?.selectedProvider?.owner_id,
  //   { skip: skip },
  // )

  useEffect(() => {
    setSelectedProvider(props.selectedProvider)
    if (props.selectedProvider) {
      setSkip(false)
    }
  }, [props.selectedProvider])

  const onCollapsed = () => {
    var isExpand = !isCollapsed
    setIsCollapsed(isExpand)
  }

  return (
    <>
      {props.selectedProviderLoading ? (
        <SpinnerForPages />
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div> provider Detail</div>
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
                  {selectedProvider?.first_name} {selectedProvider?.last_name}
                </div>
              </div>

              {/* Code */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>Gender</div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {selectedProvider?.gender}
                </div>
              </div>
              {/* Code */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>Email</div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {selectedProvider?.email}
                </div>
              </div>
              {/* Color */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>
                  Phone Number
                </div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {selectedProvider?.phone_number}
                </div>
              </div>
              {/* category */}
              {selectedProvider?.emergency_contact && (
                <div className="p-2 pt-0 pb-0 d-flex">
                  <div className={`p-2 w-25 ${styles.listKey} `}>
                    {' '}
                    Emergency Contact
                  </div>
                  <div className={`p-2 w-75 ${styles.list} `}>
                    {selectedProvider?.emergency_contact}
                  </div>
                </div>
              )}

              {/* status */}
              <div className="p-2 pt-0 pb-0 d-flex">
                <div className={`p-2 w-25 ${styles.listKey} `}>Status </div>
                <div className={`p-2 w-75 ${styles.list} `}>
                  {selectedProvider?.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      <Credit />
    </>
  )
}

export default PublicProviderDetail
