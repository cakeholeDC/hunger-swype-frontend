import React from 'react'
import { Header, Radio, List } from 'semantic-ui-react'
import { toTitleCase } from '../utils/Helpers.js'
import { connect } from 'react-redux'

class DietFilterItem extends React.Component {
	constructor(){
		super()
		this.state = {
			checked: false
		}
	}

	toggleFilter = () => {
		const init = this.props.diets.includes(this.props.item)

		this.setState({
			checked: !this.state.checked
		})
		this.props.onFilterChange(this.props.item, !init)
	}

	render(){
		return(
			<List.Item className="filter-items" onClick={ this.toggleFilter }>
				<List.Content floated="right">
					<Radio toggle name={ this.props.item } checked={ this.props.step === "diets" ? this.props.diets.includes(this.props.item) : this.state.checked } onChange={ this.toggleFilter } />
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

export default connect(mapStateToProps)(DietFilterItem)
