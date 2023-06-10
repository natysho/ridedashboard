import React, { useEffect } from 'react'
import Header from 'shared/layout/header'

import Navigation from '../../../shared/layout/navigation'
import Home from '../map/home'

function ProviderTracking() {
  const handle_burger_btn = () => {
    const sidebar = document.getElementById('sidebar')
    sidebar?.classList.toggle('close')
  }

  useEffect(() => {
    const sidebar = document.getElementById('sidebar')
    sidebar?.classList.toggle('close')
  })
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
                onClick={() => handle_burger_btn()}
              ></i>
              <span className="text text-white">Provider Tracking</span>
            </div>
            <div>
              <Header />
            </div>
          </div>
          <div className="container-fluid">
            <Home />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProviderTracking
