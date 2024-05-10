import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import './User.css'

function User() {
  return (
    <div className='user p-3'>
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link lnk"
            to={`articles`}
          >
            Articles
          </NavLink>
        </li>
      </ul>
     <Outlet />
   </div>
  )
}

export default User
