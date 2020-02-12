import React from 'react'
import { List, Button, Input } from 'semantic-ui-react'
import FilterItem from './FilterItem.js'
import { toTitleCase } from '../utils/Helpers.js'
import { fetchingDishes, getMatches, setCurrentUserState } from '../redux/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const BASE_URL = "https://hunger-swype-api.herokuapp.com"
const PREFS_URL = `${BASE_URL}/preferences` 

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
			filterStep: "diets",
			dietsFilter: [...this.props.currentUser.diets.map(diet=> diet.name)]
		})
	}
	
	onFilterChange = (item, status) => {

		switch (this.state.filterStep){
			case "diets":
				if (this.state.dietsFilter.includes(item)) {
					status = false
				}

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
					this.setUserDietPreferences()
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

	setUserDietPreferences() {
		if (this.props.currentUser){
			const prefs = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accepts": "application/json"
				},
				body: JSON.stringify({
					currentUser: this.props.currentUser.id,
					diets: this.state.dietsFilter
				})
			} 
			fetch(PREFS_URL, prefs)
				.then(res => res.json())
				.then(user => this.props.setCurrentUserState(user))
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
			<div id="filter-container">
				<h2 className="yellow-header" id="filter-step">{toTitleCase(`${this.state.filterStep}`)}</h2>
				<div className="filter-content">
					<List divided >
						{ this.getFilterItems().map(item => <FilterItem step={this.state.filterStep} key={item} item={item} diets={this.state.dietsFilter} onFilterChange={this.onFilterChange}/>) }
					</List>

				</div>
				<h4 className="continue-btn-label">
					Continue to { this.state.filterStep === "diets" 
									? "Cuisine Types" 
									: this.state.filterStep === "cuisines"
										? "Courses"
										: this.state.filterStep === "courses"
											? "Matches"//"Keywords"
											: "Matches"
								}
				</h4>
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
  getMatches: () => {dispatch(getMatches())},
  setCurrentUserState: (user) => { dispatch(setCurrentUserState(user)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filters))

