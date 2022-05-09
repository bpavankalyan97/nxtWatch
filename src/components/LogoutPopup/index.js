import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'

import './index.css'

const ReactPopUp = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/')
  }

  const renderLogoutPopup = getClassName => (
    <Popup
      modal
      trigger={
        <button className={getClassName('logout-button')} type="button">
          Logout
        </button>
      }
    >
      {close => (
        <div className={getClassName('popup-container')}>
          <p className={getClassName('popup-title')}>
            Are you sure, you want to logout?
          </p>
          <div className="popup-buttons-container">
            <button
              className={getClassName('cancel-button')}
              type="button"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              className="confirm-button"
              type="button"
              onClick={onClickLogout}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </Popup>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const cng = new ClassNameGenerator(isDarkTheme)
        return renderLogoutPopup(cng.getClassName)
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(ReactPopUp)
