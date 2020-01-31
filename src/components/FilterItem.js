import React from 'react'
import { Header, Radio, List } from 'semantic-ui-react'
import { toTitleCase } from '../utils/Helpers.js'

class FilterItem extends React.Component {
	constructor(){
		super()
		this.state = {
			checked: true
		}
	}
	

	toggleFilter = (item) => {
		const init = this.state.checked

		this.setState({
			checked: !this.state.checked
		})
		this.props.onFilterChange(this.props.item, !init)
	}

	render(){
		console.log("FilterItem(props)", this.props)
		return(
			<List.Item className="filter-items">
				<List.Content floated="right">
					<Radio toggle name={ this.props.item } checked={this.state.checked} onChange={ this.toggleFilter } />
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

export default FilterItem
