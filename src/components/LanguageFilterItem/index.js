// Write your code
import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  state = {
    touch: false,
  }

  clickLanguage = () => {
    const {details, clickCategory} = this.props
    const {id} = details
    this.setState({
      touch: true,
    })
    clickCategory(id)
  }

  render() {
    const {touch} = this.state
    const {details} = this.props
    const {language} = details

    return (
      <li className="list-item">
        <button
          type="button"
          onClick={this.clickLanguage}
          className={touch ? 'blue-mod' : 'button'}
        >
          {language}
        </button>
      </li>
    )
  }
}

export default LanguageFilterItem
