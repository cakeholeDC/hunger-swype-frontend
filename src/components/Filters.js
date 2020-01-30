import React from 'react'
import { Container, Header, List, Button, Input } from 'semantic-ui-react'
import FilterItem from './FilterItem.js'
import { toTitleCase } from '../utils/TitleCaser.js'
// import store from '../redux/store'
import { connect } from 'react-redux'

class Filters extends React.Component {
	state = {
		filterStep: "diets",
		diets: ["Vegetarian", "Vegan", "Keto","Gluten Free"],
		cuisines: ["Italian", "Chinese", "American", "European", "Mediterranean", "Thai"],
		courses: ["Breakfast", "Lunch", "Dinner"],
		keywords: ["Pork", "Seafood"]
	}

	contineToNextStep = () => {
		let nextStep

		switch (this.state.filterStep){
			case "diets":
				nextStep = "cuisines"
				break
			case "cuisines":
				nextStep = "courses"
				break
			case "courses":
				nextStep = "keywords"
				break
			default:
				nextStep = "diets"
		}

		this.setState({
			filterStep: nextStep
		})
	}

	getFilterItems() {
		switch (this.state.filterStep){
			case "diets":
				return this.state.diets.sort((a,b) => a > b ? 1 : -1)
			case "cuisines":
				return this.state.cuisines.sort((a,b) => a > b ? 1 : -1)
			case "courses":
				return this.state.courses.sort((a,b) => a > b ? 1 : -1)
			case "keywords":
				return this.state.keywords.sort((a,b) => a > b ? 1 : -1)
			default:
				return this.state.diets.sort((a,b) => a > b ? 1 : -1)
		}
	}

	render(){
		console.log("Filters", this.props)
		return(
			<div>
				<Header as='h3' className="user-prompt filter">Filter By {toTitleCase(this.state.filterStep)}</Header>
				<Container id="filter-container">
					<List divided >
						{ this.getFilterItems().map(item => <FilterItem key={item} item={item}/>) }
						{ this.state.filterStep === "keywords" 
							? <List.Item>
								<List.Content floated="right">
									<Button size="mini" circular primary icon="plus" onClick={ () => console.log(`Adding Keyword`)}/>
								</List.Content>
								<List.Content floated="left">
									<Input size="mini" placeholder='asparagus...' />
								</List.Content>
							  </List.Item>
							: null}
					</List>

				</Container>
				<Header as="h4">
					Continue to { this.state.filterStep === "diets" 
									? "Cuisine Types" 
									: this.state.filterStep === "cuisines"
										? "Courses"
										: "Matches"
								}
				</Header>
				<Button 
					circular
					positive
					className="massive single-user-action"
					onClick={ this.contineToNextStep }
					icon='arrow right'
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    progress: state.progress
  }
}

export default connect(mapStateToProps)(Filters)