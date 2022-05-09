import {Link} from 'react-router-dom'

import {RiMoonFill} from 'react-icons/ri'
import {FiSun} from 'react-icons/fi'

import LogoutPopup from '../LogoutPopup'
import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'

import './index.css'

const Header = () => {
  const getWebsiteLogo = isDarkTheme =>
    isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  const renderHeaderComponent = (isDarkTheme, toggleTheme, getClassName) => (
    <nav className={getClassName('navbar')}>
      <Link to="/">
        <img
          className="nav-website-logo"
          src={getWebsiteLogo(isDarkTheme)}
          alt="website logo"
        />
      </Link>

      <ul className="nav-items-container">
        <li className="nav-item">
          <button
            data-testid="theme"
            className="theme-toggle-button"
            type="button"
            onClick={toggleTheme}
          >
            {isDarkTheme ? (
              <FiSun className="theme-toggle-image-dark" />
            ) : (
              <RiMoonFill className="theme-toggle-image" />
            )}
          </button>
        </li>

        <li className="nav-item">
          <img
            className="nav-profile"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
        </li>

        <li className="nav-item">
          <LogoutPopup />
        </li>
      </ul>
    </nav>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const cng = new ClassNameGenerator(isDarkTheme)
        return renderHeaderComponent(isDarkTheme, toggleTheme, cng.getClassName)
      }}
    </ThemeContext.Consumer>
  )
}

export default Header
