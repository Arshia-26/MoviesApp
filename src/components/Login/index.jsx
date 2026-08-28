import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onSubmitLogin = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify(userDetails),
      })

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        navigate('/', {replace: true})
      } else {
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again')
    }
  }

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={onSubmitLogin}>
        <img
          src="https://res.cloudinary.com/wrjleffs/image/upload/v1787741781/Group_7399.png"
          alt="login website logo"
          className="login-logo"
        />

        <h1>Login</h1>

        <div className="form-control">
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <div className="show-password-container">
          <input
            id="showPassword"
            type="checkbox"
            checked={showPassword}
            onChange={event => setShowPassword(event.target.checked)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        {errorMsg !== '' && (
          <p className="error-message">{errorMsg}</p>
        )}
      </form>
    </div>
  )
}

export default Login