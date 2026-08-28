import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

import './index.css'

const Account = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <main className="account-container">
      <div className="account-card">
        <h1>Account</h1>

        <div className="account-section">
          <h2>Membership</h2>
          <p>Premium</p>
        </div>

        <div className="account-section">
          <h2>Username</h2>
          <p>rahul</p>
        </div>

        <div className="account-section">
          <h2>Password</h2>
          <p>••••••••</p>
        </div>

        <button
          type="button"
          className="account-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </main>
  )
}

export default Account