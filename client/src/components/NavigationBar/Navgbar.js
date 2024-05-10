import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import {useSelector,useDispatch} from 'react-redux';
import { resetState } from '../../redux/slices/userauthorslice';

function Navgbar() {
  let {loginUserStatus,currentUser}=useSelector((state)=>state.userAuthorLoginReducer);

  let dispatch=useDispatch();

  function signOut(){
    //remove token from local storage
    localStorage.removeItem('token')
    dispatch(resetState())
  }

  return (
    <div className='bar navv d-flex justify-content-between'>
    
        <img src='https://w7.pngwing.com/pngs/786/126/png-transparent-logo-contracting-photography-logo-symbol.png' alt='This is not available' className='image'/>
      <div className='att'>
       <ul className="nav">
        {loginUserStatus===false?<>
        <li className="nav-item">
        <NavLink className="nav-link lnk" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link lnk" aria-current="page" to="Signup">Signup</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link lnk" aria-current="page" to="Signin">Signin</NavLink>
        </li></>:
       <li className="nav-item">
        <NavLink className="nav-link lnk" aria-current="page" to="Signin" onClick={signOut}>
        <span className="lead  fs-4 me-3 fw-1"  style={{ color: "#994570" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'fantasy'}}>{currentUser.username}
                   <sup style={{color:'var(--dark-green)',fontSize:'1rem'}}>({currentUser.userType})</sup>
                   </span>
                  SignOut</NavLink>
        </li>
        }
       </ul>
      </div>
    </div>
  )
}

export default Navgbar
