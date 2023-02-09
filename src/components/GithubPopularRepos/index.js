import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    initialData: [],
    initial: languageFiltersData[0].id,

    currentStatus: apiStatus.loading,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {initial} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${initial}`

    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.popular_repos.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))
    this.setState({
      currentStatus: apiStatus.success,
      initialData: updatedData,
    })
    if (response.status === 401) {
      this.setState({
        currentStatus: apiStatus.failure,
      })
    }
  }

  clickCategory = id => {
    const result = languageFiltersData.filter(each => each.id === id)
    const val = result[0].language
    this.setState(
      {
        currentStatus: apiStatus.loading,
        initial: val,
      },
      this.getData,
    )
  }

  successView = () => {
    const {initialData} = this.state
    return (
      <ul className="items-container">
        {initialData.map(each => (
          <RepositoryItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  condition = () => {
    const {currentStatus} = this.state
    switch (currentStatus) {
      case apiStatus.success:
        return this.successView()
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1>Popular</h1>
        <ul className="buttons-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              details={each}
              key={each.id}
              clickCategory={this.clickCategory}
            />
          ))}
        </ul>
        {this.condition()}
      </div>
    )
  }
}

export default GithubPopularRepos
