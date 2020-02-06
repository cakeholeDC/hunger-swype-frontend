import React from 'react'
import { Container, Header, List, Button, Input } from 'semantic-ui-react'
import FilterItem from './FilterItem.js'
import { toTitleCase } from '../utils/Helpers.js'
import { fetchingDishes } from '../redux/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getMatches } from '../redux/actions'


class Filters extends React.Component {
	state = {
		filterStep: "diets",
		dietsFilter: [],
		coursesFilter: [],
		cuisinesFilter: [],
		keywordsFilter: []
	}

	componentDidMount(){
		this.setState({
			filterStep: "diets"
		})
	}
	
	onFilterChange = (item, status) => {

		switch (this.state.filterStep){
			case "diets":
				if (status === false){
					this.setState({
						dietsFilter: [...this.state.dietsFilter.filter(diet => diet !== item)]
					})
				} else {
					this.setState({
						dietsFilter: [...this.state.dietsFilter, item]
					})
				}
				break
			case "cuisines":
				if (status === false){
					this.setState({
						cuisinesFilter: [...this.state.cuisinesFilter.filter(cuisine => cuisine !== item)]
					})
				} else {
					this.setState({
						cuisinesFilter: [...this.state.cuisinesFilter, item]
					})
				}
				break
			case "courses":
				if (status === false){
					this.setState({
						coursesFilter: [...this.state.coursesFilter.filter(course => course !== item)]
					})
				} else {
					this.setState({
						coursesFilter: [...this.state.coursesFilter, item]
					})
				}
				break
			case "keyword":
				if (status === false){
					this.setState({
						keywordsFilter: [...this.state.keywordsFilter.filter(keyword => keyword.name !== item)]
					})
				} else {
					this.setState({
						keywordsFilter: [...this.state.keywordsFilter, item]
					})
				}
				break
			default:
				return null
		}
	}

	// onFilterChange = (event) => {
	// 	console.log(event.target.name, event.target.value)
	// }

	contineToNextStep = () => {
		let nextStep

		if (this.state.filterStep === "courses"){
			this.setState({
				filterStep: "match"
			})
			this.props.fetchingDishes(this.state)
			this.props.getMatches()
			this.props.history.push('/match')
		} else {
			switch (this.state.filterStep){
				case "diets":
					nextStep = "cuisines"
					break
				case "cuisines":
					nextStep = "courses"
					break
				// case "courses":
				// 	nextStep = "keywords"
				// 	break
				default:
					nextStep = "diets"
					break
			}	
			this.setState({
				filterStep: nextStep
			})
		}

		
	}

	getFilterItems = () => {
		switch (this.state.filterStep){
			case "diets":
				return this.props.diets.sort((a,b) => a > b ? 1 : -1)
			case "cuisines":
				return this.props.cuisines.sort((a,b) => a > b ? 1 : -1)
			case "courses":
				return this.props.courses.sort((a,b) => a > b ? 1 : -1)
			case "keywords":
				return this.state.keywordsFilter.sort((a,b) => a > b ? 1 : -1)
			default:
				return this.props.diets.sort((a,b) => a > b ? 1 : -1)
		}
	}

	addKeywordRow(){
		return (
			<List.Item>
				<List.Content floated="right">
					<Button size="mini" circular primary icon="plus" onClick={ () => {
							console.log(`Adding Keyword`)
							this.addKeywordRow()
						}
					}/>
				</List.Content>
				<List.Content floated="left">
					<Input size="mini" name="keywords" placeholder='asparagus...' onChange={ this.onFilterChange }/>
				</List.Content>
			</List.Item>
		)
	}

	render(){
		return(
			<React.Fragment>
				<Header as='h2' className="user-prompt" id="app-name">{toTitleCase(`${this.state.filterStep}`)}</Header>
				<Container id="filter-container">
					<List divided >
						{ this.getFilterItems().map(item => <FilterItem step={this.state.filterStep} key={item} item={item} onFilterChange={this.onFilterChange}/>) }
						{ this.state.filterStep === "keywords" 
							? this.addKeywordRow()
							: null
						}
						{  }
					</List>

				</Container>
				<Header inverted as="h4">
					Continue to { this.state.filterStep === "diets" 
									? "Cuisine Types" 
									: this.state.filterStep === "cuisines"
										? "Courses"
										: this.state.filterStep === "courses"
											? "Keywords"
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
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    progress: state.progress,
    dishes: state.dishes,
	diets: state.diets,
	cuisines: state.cuisines,
	courses: state.courses,
	filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchingDishes: (obj) => { dispatch(fetchingDishes(obj))} ,
  getMatches: () => {dispatch(getMatches())}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filters))

