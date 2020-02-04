import React from 'react'
import MenuBar from './MenuBar'
import { Image, Header, List } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const BASE_URL = "http://localhost:3000"
const RECIPE_URL = `${BASE_URL}/match/recipe`

class Recipe extends React.Component {
	state={
		recipeDetails: null
	}

	componentDidMount(){
		const recipeID = this.props.match.params.id
		fetch(`${RECIPE_URL}/${recipeID}`)
			.then(res => res.json())
			.then(recipe => {
				this.setState({
					recipeDetails: recipe
				})
			})
	}

	render(){
		console.log("RECIPE =>", this.props)
		// if (this.state.recipeDetails !== null){
		// 	const { photo, title, rating, servings, cook_time: cookTime, ingredients, directions } = this.state.recipeDetails
		// }
		return(
			!this.state.recipeDetails
			? null
			: <React.Fragment>
				<MenuBar />
				<Image 
				 	fluid
				 	src={ this.state.recipeDetails.photo }
				 	className="match-image"
			 	/>
				<Header as="h3">
					{ this.state.recipeDetails.title }
				</Header>
				<Header as="h4" textAlign="left">
					Serves: { this.state.recipeDetails.servings }
				</Header>
				<Header as="h4" textAlign="right">
					{ this.state.recipeDetails.rating }/100
				</Header>
				<List ordered>
					Ingredients: { this.state.recipeDetails.ingredients }
				</List>
			</React.Fragment>
		)
	}
}

export default withRouter(Recipe)