import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'

import {LoginButton} from './styledComponent'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
    showPassword: false,
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {username, password} = this.state
    this.submitCredentials(username, password)
  }

  submitCredentials = async (username, password) => {
    const credentials = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.loginSuccessful(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  loginSuccessful = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = error => {
    this.setState({
      showError: true,
      errorMsg: error,
    })
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = event => {
    this.setState({showPassword: event.target.checked})
  }

  getWebsiteLogo = isDarkTheme =>
    isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  renderLoginComponent = (isDarkTheme, getClassName) => {
    const {username, password, showError, errorMsg, showPassword} = this.state

    return (
      <div className={getClassName('login-container')}>
        <form
          onSubmit={this.onFormSubmit}
          className={getClassName('login-form-container')}
        >
          <img
            className="login-website-logo"
            src={this.getWebsiteLogo(isDarkTheme)}
            alt="website logo"
          />

          <label
            className={getClassName('login-form-label')}
            htmlFor="username"
          >
            USERNAME
          </label>
          <input
            id="username"
            className={getClassName('login-form-input')}
            type="text"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUsername}
          />

          <label
            className={getClassName('login-form-label')}
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            id="password"
            className={getClassName('login-form-input')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />

          <div className="login-show-password-container">
            <input
              className="login-form-checkbox"
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={this.onChangeCheckbox}
            />
            <label
              htmlFor="showPassword"
              className={getClassName('login-form-label2')}
            >
              Show Password
            </label>
          </div>

          <LoginButton className="login-button" type="submit">
            Login
          </LoginButton>

          {showError && <p className="login-failure-error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const cng = new ClassNameGenerator(isDarkTheme)
          return this.renderLoginComponent(isDarkTheme, cng.getClassName)
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
