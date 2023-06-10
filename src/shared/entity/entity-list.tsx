import { IconPlus, IconSearch, IconFilter } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Table,
  DropdownButton,
  Dropdown,
  FormControl,
  InputGroup,
  Pagination,
  Form,
  Spinner,
} from 'react-bootstrap'
import { useStore } from 'react-redux'
import { Link, Outlet, useParams } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  EntityConfiguration,
  PDF,
  PDFOrientationOption,
  PDFSizeOption,
  PDFUnitOption,
} from './models'
import './entity-list.scss'
import ReactPaginate from 'react-paginate'
import * as _ from 'lodash'
import EmptyState from 'shared/component/empty-state'
import SpinnerForPages from 'shared/component/spinner-for-pages'
interface EntityListProps {
  items: any[]
  total: number
  itemsLoading?: boolean
  config: EntityConfiguration
  search: any
  reportTitle?: string
  pdfConfig?: PDF
  pagination: any
  filter: any
}
function EntityList(props: EntityListProps) {
  const [items, setItems] = useState<any[]>(props.items)
  const [total, setTotal] = useState<number>(props.total)
  const [pageSize, setPageSize] = useState<number>(10)
  const [config, setConfig] = useState<EntityConfiguration>(props.config)
  const [pdfConfig, setPdfConfig] = useState<PDF | undefined>(props.pdfConfig)
  const [dropdownTitle, setDropdawnTitle] = useState<string>('10 / page')
  useEffect(() => {
    setItems(props.items)
    setConfig(props.config)
  }, [props.items, props.config])

  useEffect(() => {
    setTotal(props.total)
    setPdfConfig(props.pdfConfig)
  }, [props.total, props.pdfConfig])

  const exportPDF = () => {
    const unit = pdfConfig?.unit ? pdfConfig?.unit : PDFUnitOption.PT
    const size = pdfConfig?.size ? pdfConfig.size : PDFSizeOption.A4
    const orientation = pdfConfig?.orientation
      ? pdfConfig.orientation
      : PDFOrientationOption.Landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = `${
      props?.reportTitle ? props?.reportTitle : config.title
    }  Report`
    const headers: any[] = []

    var printerData: any[] = []
    if (pdfConfig?.visibleColumn?.length) {
      var head: any[] = []
      pdfConfig?.visibleColumn?.map((col) => {
        head.push(col.name)
      })
      headers.push(head)

      const data = items.map((elt: any) => {
        let result: any[] = []
        pdfConfig?.visibleColumn?.map((col) => {
          result = [...result, elt[col.key]]
        })

        printerData.push({ ...result })
      })
    } else {
      var key = Object.keys(items[0])
      var changedKey: any[] = []
      key.map((element) => {
        changedKey.push(_.startCase(element))
      })
      headers.push(changedKey)

      items.map((element) => {
        let result: any[] = []
        Object.keys(items[0]).map((key) => {
          result.push(element[key])
        })
        printerData.push(result)
      })
    }

    let content = {
      startY: 50,
      head: headers,
      body: printerData,
    }

    doc.text(title, marginLeft, 40)
    autoTable(doc, content)
    doc.save(`${pdfConfig?.fileName ? pdfConfig?.fileName : 'report'}.pdf`)
  }

  const onPageIndexChange = (page: any) => {
    setPageSize(pageSize)
    const request = {
      skip:
        page.selected !== 0
          ? page.selected * pageSize - 1
          : page.selected * pageSize,
      top: page.selected !== 0 ? pageSize + 1 : pageSize,
    }
    props.pagination(request)
  }
  const onPageSizeChange = (page: number) => {
    const request = {
      skip: 0,
      top: page,
    }
    setPageSize(page)
    props.pagination(request)
  }
  var filterParam: any[] = []
  const onFilter = (event: any) => {
    var selectedField = JSON.parse(event.target.value)
    event.target.checked
      ? filterParam.push(selectedField)
      : (filterParam = filterParam.filter((a) => a.name !== selectedField.name))
    props.filter(filterParam)
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
  return (
    <>
      {props.itemsLoading ? (
        <SpinnerForPages />
      ) : (
        <>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <div>{config?.title}</div>
                <div
                  className={config?.showNewButton === false ? 'd-none' : ''}
                >
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="background_primary text-white border"
                  >
                    <Link
                      className="text-decoration-none text-white"
                      to={`${config.rootUrl}/new`}
                    >
                      {' '}
                      <IconPlus /> Add
                    </Link>
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="container-fluid h-100">
              {total > 0 ? (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <DropdownButton
                        size="sm"
                        variant="outline-success"
                        className="background_primary text-white border"
                        title="Action"
                        id="input-group-dropdown-1"
                      >
                        <Dropdown.Item className="mb-2" onClick={exportPDF}>
                          Export PDF
                        </Dropdown.Item>
                        <CSVLink
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                            padding: '16px',
                          }}
                          data={items}
                        >
                          Export CSV
                        </CSVLink>
                      </DropdownButton>
                    </div>
                    <div className="d-flex  w-50 p-1">
                      <div
                        className={
                          !config.filter?.length ? 'w-100' : 'w-75 mx-2'
                        }
                      >
                        <InputGroup>
                          <FormControl
                            onKeyUp={props.search}
                            placeholder="search here"
                            aria-placeholder="basic-search"
                          />
                          <InputGroup.Text id="basic-search">
                            <IconSearch />
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                      <div className={!config.filter?.length ? 'd-none' : ''}>
                        <DropdownButton
                          variant="outline-secondary"
                          title="Filter"
                          id="input-group-dropdown-2"
                        >
                          {config?.filter?.map((da, index) => {
                            return (
                              <div className="m-2">
                                <Form.Check
                                  key={index}
                                  id={da.name}
                                  label={da.name}
                                  value={JSON.stringify(da)}
                                  onChange={onFilter}
                                />
                              </div>
                            )
                          })}
                        </DropdownButton>
                      </div>
                    </div>
                  </div>
                  <Table size="sm" striped bordered hover>
                    <thead>
                      <tr>
                        {config?.visibleColumn.map((col) => {
                          return <th key={col.key}>{col?.name}</th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {items?.map((data) => {
                        return (
                          <tr key={data?.id}>
                            {config.visibleColumn.map((col) => {
                              if (config.hasDetail === false) {
                                return (
                                  <td key={col.key}>
                                    {col.isDate
                                      ? dateFormater(data[col.key])
                                      : data[col.key]}
                                  </td>
                                )
                              } else {
                                return (
                                  <td key={col.key}>
                                    <Link
                                      to={
                                        config?.detailUrl
                                          ? `${config.detailUrl}/${data.id}`
                                          : `detail/${data.id}`
                                      }
                                      className="text-decoration-none text-black"
                                    >
                                      {col.isDate
                                        ? dateFormater(data[col.key])
                                        : data[col.key]}
                                    </Link>
                                  </td>
                                )
                              }
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-between">
                    <div>
                      <DropdownButton
                        size="sm"
                        variant="outline-secondary"
                        title={dropdownTitle}
                        id="input-group-dropdown-1"
                      >
                        <Dropdown.Item
                          onClick={() => {
                            onPageSizeChange(5)
                            setDropdawnTitle('5 / page')
                          }}
                        >
                          5 / page
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            onPageSizeChange(10)
                            setDropdawnTitle('10 / page')
                          }}
                        >
                          10 / page
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            onPageSizeChange(20)
                            setDropdawnTitle('20 / page')
                          }}
                        >
                          {' '}
                          20/ page
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            onPageSizeChange(30)
                            setDropdawnTitle('30 / page')
                          }}
                        >
                          {' '}
                          30 / page
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            onPageSizeChange(40)
                            setDropdawnTitle('40 / page')
                          }}
                        >
                          {' '}
                          40 / page
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <div>
                      <ReactPaginate
                        pageCount={Math.ceil(total / pageSize)}
                        breakLabel="..."
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={onPageIndexChange}
                        containerClassName="pagination justify-content-end"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        activeClassName="active"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <EmptyState />
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </>
  )
}

export default EntityList
