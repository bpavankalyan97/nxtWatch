import {Component} from 'react'
import ReactPlayer from 'react-player/youtube'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

class VideoDetailsItem extends Component {
  state = {
    status: '',
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    videosDetails: [],
  }

  componentDidMount() {
    this.fetchVideosList()
  }

  fetchVideosList = async () => {
    this.setState({
      status: 'loading',
    })

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const videoItemDetailsApiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(videoItemDetailsApiUrl, options)
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
      videosDetails: data.video_details,
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

  videoLiked = () => {
    this.setState({
      isLiked: true,
      isDisliked: false,
    })
  }

  videDisliked = () => {
    this.setState({
      isLiked: false,
      isDisliked: true,
    })
  }

  renderSuccessView = addVideo => {
    const {isLiked, isDisliked, isSaved, videosDetails} = this.state

    const onCLickAdd = () => {
      this.setState({isSaved: true})
      addVideo(videosDetails)
    }

    return (
      <div>
        <ReactPlayer url={videosDetails.video_url} width="100%" controls />
        <p>{videosDetails.title}</p>
        <p>{videosDetails.view_count}</p>
        <p>{videosDetails.published_at}</p>
        <div>
          <button
            type="button"
            className={isLiked ? 'liked-button' : 'like-button'}
            onClick={this.videoLiked}
          >
            Like
          </button>
          <button
            type="button"
            onClick={this.videDisliked}
            className={isDisliked ? 'disliked-button' : 'dislike-button'}
          >
            Dislike
          </button>
          <button
            type="button"
            className={isSaved ? 'liked-button' : 'like-button'}
            onClick={onCLickAdd}
          >
            Save
          </button>
        </div>

        <img src={videosDetails.channel.profile_image_url} alt="channel logo" />
        <p>{videosDetails.channel.name}</p>
        <p>{videosDetails.channel.subscriber_count}</p>
        <p>{videosDetails.description}</p>
      </div>
    )
  }

  renderDisplayView = addVideo => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.renderLoadingView()
      case 'success':
        return this.renderSuccessView(addVideo)
      case 'failed':
        return this.renderFailedView()

      default:
        return null
    }
  }

  renderHomeComponent = (isDarkTheme, getClassName, addVideo) => (
    <div className="bg-container">
      <Header />
      <div className="base-container">
        <SideBar />
        <div className={getClassName('other-container')}>
          {this.renderDisplayView(addVideo)}
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, addVideo} = value
          const cng = new ClassNameGenerator(isDarkTheme)
          return this.renderHomeComponent(
            isDarkTheme,
            cng.getClassName,
            addVideo,
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default VideoDetailsItem
