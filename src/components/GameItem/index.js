import './index.css'

const GameItem = props => {
  const {data} = props

  return (
    <li>
      <img src={data.thumbnail_url} alt="video thumbnail" />
      <p>{data.title}</p>
      <p>{data.view_count}</p>
    </li>
  )
}

export default GameItem
