import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'
import VideoItem from '../VideoItem'

class Trending extends Component {
  state = {
    status: '',
    videosList: [],
  }

  componentDidMount() {
    this.fetchVideosList()
  }

  fetchVideosList = async () => {
    this.setState({
      status: 'loading',
    })

    const jwtToken = Cookies.get('jwt_token')

    const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(trendingVideosApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.fetchSuccessful(data)
    } else {
      this.failedFetch()
    }
  }

  fetchSuccessful = data => {
    this.setState({
      status: 'success',
      videosList: data.videos,
    })
  }

  failedFetch = () => {
    this.setState({
      status: 'failed',
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {videosList} = this.state

    return (
      <ul>
        {videosList.map(video => (
          <VideoItem key={video.id} data={video} />
        ))}
      </ul>
    )
  }

  renderFailedView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" onClick={this.fetchVideosList}>
        Retry
      </button>
    </div>
  )

  renderDisplayView = () => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.renderLoadingView()
      case 'no_results':
        return this.renderNoResultsView()
      case 'success':
        return this.renderSuccessView()
      case 'failed':
        return this.renderFailedView()

      default:
        return null
    }
  }

  renderHomeComponent = (isDarkTheme, getClassName) => (
    <div className="bg-container">
      <Header />
      <div className="base-container">
        <SideBar />
        <div data-testid="trending" className={getClassName('other-container')}>
          <h1>Trending</h1>
          {this.renderDisplayView()}
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
export default Trending
