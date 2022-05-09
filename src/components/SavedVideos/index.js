import ThemeContext from '../../context/ThemeContext'
import ClassNameGenerator from '../../ClassNameGenerator'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'
import VideoItem from '../VideoItem'

const SavedVideos = () => {
  const renderNoVideosView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  const renderSavedVideosView = videos => (
    <ul>
      {videos.map(video => (
        <VideoItem key={video.id} data={video} />
      ))}
    </ul>
  )

  const renderHomeComponent = (isDarkTheme, getClassName, savedVideos) => (
    <div className="bg-container">
      <Header />
      <div className="base-container">
        <SideBar />
        <div
          data-testid="savedVideos"
          className={getClassName('other-container')}
        >
          <h1>Saved Videos</h1>
          {savedVideos.length === 0
            ? renderNoVideosView()
            : renderSavedVideosView(savedVideos)}
        </div>
      </div>
    </div>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, savedVideos} = value
        const cng = new ClassNameGenerator(isDarkTheme)
        return renderHomeComponent(isDarkTheme, cng.getClassName, savedVideos)
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideos
