import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'shared/layout/header'

import Navigation from '../../../shared/layout/navigation'
import ProviderList from './provider-list'

function Provider() {
  function handle_burger_btn(): void {
    const sidebar = document.getElementById('sidebar')
    sidebar?.classList.toggle('close')
  }

  return (
    <React.Fragment>
      <div className="d-flex">
        <Navigation />
        <div className="page_content">
          <div
            style={{ backgroundColor: '#11101d' }}
            className="nav_header d-flex justify-content-between mb-4"
          >
            <div className="d-flex">
              <i
                className="bx bx-menu burger_icon text-white"
                onClick={handle_burger_btn}
              ></i>
              <span className="text text-white">Provider</span>
            </div>
            <div>
              <Header />
            </div>
          </div>
          <div className="container-fluid h-100">
            <Outlet />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Provider
