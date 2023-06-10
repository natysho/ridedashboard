import { IconBellRinging, IconLock, IconLogout, IconUser } from '@tabler/icons'
import React from 'react'
import {
  Badge,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import './header.scss'
import user from 'assets/img/user.jpg'
import { Link, NavLink } from 'react-router-dom'
import { userService } from 'services/auth/user-services'
import { history } from '../../services/auth/history'

function Header() {
  const userRole: string[] = userService.getCurrentUserRoles
  const currentRole: string = userService.currentRole
  const filteredRole = userRole.filter((rol) => rol !== currentRole)
  const changeRole = (role) => {
    localStorage.setItem('currentRole', JSON.stringify(role))
    history.push('/dashboard')
    window.location.reload()
  }

  return (
    <div className="d-flex">
      <div className="align-self-center ml-2 position-relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-bell  text-dark bg-opacity-25"
          width="35"
          height="35"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="white"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
          <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
        </svg>
        <span
          style={{ height: 25, width: 25 }}
          className="mt-2 rounded-circle badge badge-pill bg-danger position-absolute  top-0 start-100 translate-middle  border-0"
        >
          66
        </span>
      </div>

      <div className="dropdown mx-4">
        <a
          className="btn border-0"
          type="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="d-flex">
            <div>
              <Image
                style={{ width: 35, height: 35 }}
                roundedCircle
                src={user}
              />
            </div>

            {/* <div className='mx-1'>
                            <div style={{ fontSize: 14, color: 'white' }}> Shanbel Kassa</div>
                            <div style={{ fontSize: 12, color: 'white' }}>Admin</div>
                        </div> */}
          </div>
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li className="dropdown-text">
            <span className="p-2">Abebe Alemu</span>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              {' '}
              Profile
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              {' '}
              Change Password
            </a>
          </li>
          <li>
            <NavLink
              onClick={() => localStorage.clear()}
              className="dropdown-item"
              to="/login"
            >
              Logout
            </NavLink>
          </li>
          {filteredRole.map((element) => {
            return (
              <li key={element}>
                <Link
                  onClick={() => changeRole(element)}
                  className="dropdown-item"
                  to=""
                >
                  {element}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* <div>
                <Image style={{ width: 40, height: 40 }} roundedCircle src='https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg'></Image>
                <DropdownButton variant='white' id="dropdown-item-button" title="Dropdown button">
                    <Dropdown.Item as="button">Action</Dropdown.Item>
                    <Dropdown.Item as="button">Another action</Dropdown.Item>
                    <Dropdown.Item as="button">Something else</Dropdown.Item>


                </DropdownButton>
            </div > */}
    </div>
  )
}

export default Header
