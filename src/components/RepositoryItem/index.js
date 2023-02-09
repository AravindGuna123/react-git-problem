// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {id, name, avatarUrl, starsCount, issuesCount, forksCount} = details

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1>{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="small-icon"
        />
        <p>{starsCount}</p>
        <p>stars</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="small-icon"
        />
        <p>{forksCount}</p>
        <p>forks</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="small-icon"
        />
        <p>{issuesCount}</p>
        <p>open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
