import React from 'react'
import MenuBar from './MenuBar'
import { Image, Header, Container, Divider, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleFavorite } from '../redux/actions.js'

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

	recipeIsFavorite(){
		return this.props.currentUser.favorite_recipes.map(rec => rec.id).includes(this.state.recipeDetails.id)

		// return this.props.currentUser.favorite_recipes.includes(this.state.recipeDetails)
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
				<div id="recipe-page-container">
					<Image 
					 	fluid
					 	src={ this.state.recipeDetails.photo }
					 	className="recipe-image"
				 	/>
				 	<div className="recipe-page">
						<Header as="h3" className="recipe-title">
							{ this.state.recipeDetails.title }
						</Header>
						<Header as="h4">
							Cook Time: {this.state.recipeDetails.cook_time} min<br/>Serves: { this.state.recipeDetails.servings }
						</Header>
				        <div className="icon-container">
				        		<small className="favorites-toggle" onClick={ () => this.props.toggleFavorite(this.props.currentUser.id, this.state.recipeDetails) }>
					          	    <Icon 
					          	    	color="red" 
					          	    	name={ this.props.currentUser 
					          	    			? this.recipeIsFavorite() 
				          	    					? "heart"
				          	    					: "heart outline" 
			          	    					: "heart outline"
			          	    				 }
		      	    				/> Flavourite
				          	    </small>
							<small className="gray-text recipe-rating">
								<Icon color='green' name='thumbs up' /> { this.state.recipeDetails.rating }%
							</small>
			            </div>
						<Divider horizontal>
					      <Header as='h4'>
					        <Icon name='list' size='mini' />
								Ingredients 
						  </Header>
					    </Divider>
						<ul className="ingredient-list">
							{ this.getIngredients().map((ingredient, index) => <li key={`ingredient-${index}`}>{ingredient}</li> ) }
						</ul>
						<Divider horizontal>
					      <Header as='h4'>
					        <Icon name='tasks' size='mini' />
								Directions 
						  </Header>
					    </Divider>
					    <ol className="directions-list">
					    	{ this.state.recipeDetails.directions.map((step, index) => <li key={`step-${index}`}>{step}</li> ) }
					    </ol>
					<Divider />
					<a href={ this.state.recipeDetails.source_url } target="_blank">View Original Recipe</a> 
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (userID, recipe) => { dispatch(toggleFavorite(userID, recipe)) }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe))