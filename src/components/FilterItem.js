import React from 'react'
import { Header, Radio, List } from 'semantic-ui-react'
import { toTitleCase } from '../utils/Helpers.js'
import { connect } from 'react-redux'

class FilterItem extends React.Component {
	constructor(){
		super()
		this.state = {
			checked: false
		}
	}
	

	toggleFilter = (item) => {
		const init = this.state.checked

		this.setState({
			checked: !this.state.checked
		})
		this.props.onFilterChange(this.props.item, !init)
	}

	userDietsArray(){
		return this.props.currentUser.diets.map(diet => diet.name)
	}

	render(){
		return(
			<List.Item className="filter-items">
				<List.Content floated="right">
					<Radio toggle name={ this.props.item } checked={ this.userDietsArray().includes(this.props.item) ? true : this.state.checked } onChange={ this.toggleFilter } />
				</List.Content>
				<List.Content floated="left">
					<Header
						as='h4'
						className="filter-item"
					>
						{ toTitleCase(this.props.item) }
					</Header>
				</List.Content>
			</List.Item>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(FilterItem)
