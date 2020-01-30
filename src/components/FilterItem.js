import React from 'react'
import { Header, Checkbox, List } from 'semantic-ui-react'

class FilterItem extends React.Component {
	render(){
		console.log("FilterItem", this.props)
		return(
			<List.Item className="filter-items">
				<List.Content floated="right">
					<Checkbox toggle onChange={ () => console.log(`toggling ${this.props.item}`)}/>
				</List.Content>
				<List.Content floated="left">
					<Header
						as='h4'
						className="filter-item"
					>
						{ this.props.item }
					</Header>
				</List.Content>
			</List.Item>
		)
	}
}

export default FilterItem