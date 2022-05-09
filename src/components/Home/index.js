import {Component} from 'react'
import {GrClose} from 'react-icons/gr'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'
import BannerContainer from './styledComponent'
import VideoItem from '../VideoItem'

class Home extends Component {
  state = {
    searchInput: '',
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

    const {searchInput} = this.state
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(homeVideosApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.fetchSuccessful(data)
    } else {
      this.failedFetch()
    }
  }

  fetchSuccessful = data => {
    if (data.total === 0) {
      this.setState({
        status: 'no_results',
        videosList: data.videos,
      })
    } else {
      this.setState({
        status: 'success',
        videosList: data.videos,
      })
    }
  }

  failedFetch = () => {
    this.setState({
      status: 'failed',
    })
  }

  retryFetch = () => {
    this.setState(
      {
        searchInput: '',
      },
      this.fetchVideosList,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  renderNoResultsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.retryFetch}>
        Retry
      </button>
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

  renderHomeComponent = (isDarkTheme, getClassName) => {
    const {searchInput} = this.state

    return (
      <div className="bg-container">
        <Header />
        <div className="base-container">
          <SideBar />
          <div data-testid="home" className={getClassName('home-container')}>
            <BannerContainer data-testid="banner">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
              <button type="button">GET IT NOW</button>
              <button type="button" data-testid="close">
                <GrClose />
              </button>
            </BannerContainer>

            <div>
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                onClick={this.fetchVideosList}
                data-testid="searchButton"
              >
                <HiOutlineSearch />
              </button>
            </div>

            {this.renderDisplayView()}
          </div>
        </div>
      </div>
    )
  }

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
