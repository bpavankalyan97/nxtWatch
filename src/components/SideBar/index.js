import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {GiGamepad} from 'react-icons/gi'
import {CgPlayListAdd} from 'react-icons/cg'

import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'
import './index.css'

const SideBar = props => {
  const isSelected = value => {
    const {match} = props
    const {path} = match
    return path === value
  }

  const renderSideBarComponent = getClassName => (
    <div className={getClassName('sidebar-container')}>
      <ul className="links-container">
        <li
          className={
            isSelected('/') ? getClassName('selected-menu-option') : ''
          }
        >
          <Link className={getClassName('menu-option-link')} to="/">
            <AiFillHome
              className={isSelected('/') ? 'selected-option-icon' : ''}
            />
            <p
              className={
                isSelected('/') ? 'selected-option-title' : 'menu-option-title'
              }
            >
              Home
            </p>
          </Link>
        </li>

        <li
          className={
            isSelected('/trending') ? getClassName('selected-menu-option') : ''
          }
        >
          <Link className={getClassName('menu-option-link')} to="/trending">
            <HiFire
              className={isSelected('/trending') ? 'selected-option-icon' : ''}
            />
            <p
              className={
                isSelected('/trending')
                  ? 'selected-option-title'
                  : 'menu-option-title'
              }
            >
              Trending
            </p>
          </Link>
        </li>

        <li
          className={
            isSelected('/gaming') ? getClassName('selected-menu-option') : ''
          }
        >
          <Link className={getClassName('menu-option-link')} to="/gaming">
            <GiGamepad
              className={isSelected('/gaming') ? 'selected-option-icon' : ''}
            />
            <p
              className={
                isSelected('/gaming')
                  ? 'selected-option-title'
                  : 'menu-option-title'
              }
            >
              Gaming
            </p>
          </Link>
        </li>

        <li
          className={
            isSelected('/saved-videos')
              ? getClassName('selected-menu-option')
              : ''
          }
        >
          <Link className={getClassName('menu-option-link')} to="/saved-videos">
            <CgPlayListAdd
              className={
                isSelected('/saved-videos') ? 'selected-option-icon' : ''
              }
            />
            <p
              className={
                isSelected('/saved-videos')
                  ? 'selected-option-title'
                  : 'menu-option-title'
              }
            >
              Saved videos
            </p>
          </Link>
        </li>
      </ul>

      <div className={getClassName('contact-us-section')}>
        <p className="contact-us-title">CONTACT US</p>
        <div className="social-media-links-container">
          <img
            className="social-media-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <img
            className="social-media-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            className="social-media-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </div>
        <p className="contact-us-description">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const cng = new ClassNameGenerator(isDarkTheme)
        return renderSideBarComponent(cng.getClassName)
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(SideBar)
