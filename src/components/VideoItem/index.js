import {Link} from 'react-router-dom'

const VideoItem = props => {
  const {data} = props

  return (
    <li>
      <Link to={`/videos/${data.id}`}>
        <img src={data.thumbnail_url} alt="video thumbnail" />
        <img src={data.channel.profile_image_url} alt="channel logo" />
        <p>{data.title}</p>
        <p>{data.channel.name}</p>
        <p>{data.view_count} views</p>
        <p>{data.published_at}</p>
      </Link>
    </li>
  )
}
export default VideoItem
