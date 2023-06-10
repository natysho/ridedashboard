import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/scss/navigation.scss'
import logo from '../../assets/img/logo.png'
import { userService } from 'services/auth/user-services'
import { applicationSetting } from 'config/app-setting'

function Navigation() {
  // const role = userService.getCurrentUserRoles
  const userRole = userService.currentRole
  // const userHasRequiredRole = user && roles?.includes(userRole) ? true : false
  const [visibleMenus, setVisibleMenus] = useState<any>([])

  let foundRole = applicationSetting.role.find((r) => r.name === userRole)

  useEffect(() => {
    setVisibleMenus(foundRole?.menu)
  }, [foundRole])

  const sidebarRef = useRef<HTMLDivElement | null>(null)

  function show_menu(event: React.MouseEvent<HTMLElement>): void {
    console.log(event)
    event.currentTarget.parentElement?.parentElement?.classList.toggle(
      'show_menu',
    )
  }

  const getClassName = (menu): string => {
    var className = ''
    switch (menu) {
      case 'Dashboard':
        className = 'bx bx-grid-alt'
        break
      case 'Registration':
        className = 'bx bx-message-square'
        break
      case 'Users':
        className = 'bx bx-group'
        break
      case 'Vehicle':
        className = 'bx bx-car'
        break
      case 'Driver':
        className = 'bx bx-group'
        break
      case 'Requests':
        className = 'bx bx-message-square'
        break
      case 'Driver Tracking':
        className = 'bx bx-map-pin'
        break
      case 'Services':
        className = 'bx bx-wrench'
        break
      case 'Notification':
        className = 'bx bx-bell'
        break
      case 'Settings':
        className = 'bx bx-cog'
        break
      case 'Feedback':
        className = 'bx bx-message'
        break
    }
    return className
  }
  return (
    <React.Fragment>
      <div className="sidebar" id="sidebar" ref={sidebarRef}>
        <div className="logo-details">
          <img src={logo} alt="Safe Way logo" />
          <div className="logo_name">Safe Way</div>
        </div>
        <div className="nav_links">
          {visibleMenus?.map((menu: any) => {
            if (menu.name === 'Registration') {
              return (
                <li>
                  <div className="iocn_link">
                    <Link to="">
                      <i className="bx bx-message-square"></i>
                      <div className="link_name">{menu.name}</div>
                    </Link>
                    <i
                      className="bx bxs-chevron-down arrow"
                      onClick={show_menu}
                    ></i>
                  </div>
                  <ul className="sub_menu">
                    <li>
                      <Link className="link_name" to="">
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link to="/owner">Owner</Link>
                    </li>
                    <li>
                      <Link to="/vehicle">
                        {/* <i className="bx bx-taxi"></i> */}
                        Vehicle
                      </Link>
                    </li>
                    <li>
                      <Link to="/driver">
                        {/* <i className="bx bx-user"></i> */}
                        Driver
                      </Link>
                    </li>
                  </ul>
                </li>
              )
            }

            if (menu.name === 'Requests') {
              return (
                <li>
                  <div className="iocn_link">
                    <Link to="">
                      <i className="bx bx-message-square"></i>
                      <div className="link_name">Requests</div>
                    </Link>
                    <i
                      className="bx bxs-chevron-down arrow"
                      onClick={show_menu}
                    ></i>
                  </div>
                  <ul className="sub_menu">
                    <li>
                      <Link className="link_name" to="">
                        Requests
                      </Link>
                    </li>
                    <li>
                      <Link to="/requests/accepted_requests">
                        Accepted Requests
                      </Link>
                    </li>
                    <li>
                      <Link to="/requests/started_requests">
                        Started Requests
                      </Link>
                    </li>
                    <li>
                      <Link to="/requests/completed_requests">
                        Completed Requests
                      </Link>
                    </li>
                    <li>
                      <Link to="/requests/driver_canceled_requests">
                        Driver Canceled Requests
                      </Link>
                    </li>
                    <li>
                      <Link to="/requests/passenger_canceled_requests">
                        Passenger Canceled Requests
                      </Link>
                    </li>
                  </ul>
                </li>
              )
            }
            if (menu.name === 'Settings') {
              return (
                <li>
                  <div className="iocn_link">
                    <Link to="">
                      <i className="bx bx-cog"></i>
                      <span className="link_name">Settings</span>
                    </Link>
                    <i
                      className="bx bxs-chevron-down arrow"
                      onClick={show_menu}
                    ></i>
                  </div>
                  <ul className="sub_menu">
                    <li>
                      <Link to="/settings/configuration">Configuration</Link>
                    </li>
                    <li>
                      <Link className="link_name" to="">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings/promo_codes">Promo Codes</Link>
                    </li>
                    <li>
                      <Link to="/settings/push_notification">
                        Push Notification
                      </Link>
                    </li>
                  </ul>
                </li>
              )
            } else {
              return (
                <li key={menu.name}>
                  <Link to={menu.url}>
                    <i className={getClassName(menu.name)}></i>
                    <span className="link_name">{menu.name}</span>
                  </Link>
                  <ul className="sub_menu blank">
                    <li>
                      <Link className="link_name" to="">
                        {menu.name}
                      </Link>
                    </li>
                  </ul>
                </li>
              )
            }
          })}

          {/* <li>
            <div className="profile_details">
              <div className="profile_content">
                <img src="" alt="profile" />
              </div>
              <div className="name_job">
                <div className="profile_name">User</div>
                <div className="job">Admin</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
          </li> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navigation
