import {Component} from 'react'

import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

class Home extends Component {
  state = {}

  getImageUrl = isDarkTheme =>
    isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

  renderHomeComponent = (isDarkTheme, getClassName) => (
    <div className="bg-container">
      <Header />
      <div className="base-container">
        <SideBar />
        <div className={getClassName('not-found-container')}>
          <img
            className="not-found-image"
            src={this.getImageUrl(isDarkTheme)}
            alt="not found"
          />
          <h1 className={getClassName('not-found-title')}>Page Not Found</h1>
          <p className={getClassName('not-found-description')}>
            We are sorry, the page you requested could not be found.
          </p>
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const cng = new ClassNameGenerator(isDarkTheme)
          return this.renderHomeComponent(isDarkTheme, cng.getClassName)
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
