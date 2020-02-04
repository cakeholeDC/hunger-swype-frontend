import React from 'react'
import MenuBar from './MenuBar'
import { Image, Header, Container, Divider, Icon } from 'semantic-ui-react'
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

	getIngredients(){
		const ingredients = this.state.recipeDetails.ingredients.split(";")
		return ingredients
	}

	parseDirections(){
		const directions = JSON.parse(this.state.recipeDetails.directions)
		return directions
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
			 	<Container className="recipe-page">
					<Header as="h3" className="recipe-title">
						{ this.state.recipeDetails.title }
					</Header>
					<Header as="h4">
						Cook Time: {this.state.recipeDetails.cook_time} min — Serves: { this.state.recipeDetails.servings }
					</Header>
					<small className="gray-text">
						<Icon color='green' name='thumbs up' /> { this.state.recipeDetails.rating }%
					</small>
					<Divider horizontal>
				      <Header as='h4'>
				        <Icon name='list' size='mini' />
							Ingredients 
					  </Header>
				    </Divider>
					<ul className="ingredient-list">
						{ this.getIngredients().map((ingredient, index) => <li key={`ingredient-${index}`}>{ingredient}</li> ) }
					</ul>
					<div>&nbsp;</div>
					<Divider horizontal>
				      <Header as='h4'>
				        <Icon name='tasks' size='mini' />
							Directions 
					  </Header>
				    </Divider>
				    <ol className="directions-list">
				    	{ this.state.recipeDetails.directions.map((step, index) => <li key={`step-${index}`}>{step}</li> ) }
				    </ol>
				</Container>
			</React.Fragment>
		)
	}
}

export default withRouter(Recipe)