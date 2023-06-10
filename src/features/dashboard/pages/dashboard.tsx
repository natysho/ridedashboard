import React from 'react'
import Header from 'shared/layout/header'

import Navigation from '../../../shared/layout/navigation'
import Report from '../components/report'

function Dashboard() {
  function handle_burger_btn(): void {
    const sidebar = document.getElementById('sidebar')
    console.log('1111...', sidebar)
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
              <span className="text text-white">Dashboard</span>
            </div>
            <div>
              <Header />
            </div>
          </div>
          <div className="container-fluid">
            <Report />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
