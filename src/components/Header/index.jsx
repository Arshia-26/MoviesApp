import {NavLink, Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickSearch = () => {
    navigate('/search')
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <header className="header-container">
      <div className="header-left">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/wrjleffs/image/upload/v1787741781/Group_7399.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({isActive}) =>
                  isActive ? 'nav-link active-link' : 'nav-link'
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/popular"
                className={({isActive}) =>
                  isActive ? 'nav-link active-link' : 'nav-link'
                }
              >
                Popular
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="search-button"
          data-testid="searchButton"
          onClick={onClickSearch}
          aria-label="search"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Link to="/account" className="profile-link">
          <img
            src="https://res.cloudinary.com/wrjleffs/image/upload/v1787743369/Avatar.png"
            alt="profile"
            className="profile-image"
          />
        </Link>

        <button
          type="button"
          className="logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header