
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';
import './Author.css'


function Author() {
  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer)

  return (
    <div className="author-profile p-3">
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link lnk"
            to={`article-by-author/${currentUser.username}`}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link lnk"
            to="new-article"
          >
            Add new
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}

export default Author
