import React from 'react'
import { Item, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Result extends React.Component {
	render(){
		console.log(this.props)
		const { id: recipeID, photo: recipePhoto, title: recipeTitle, rating: recipeRating, servings: recipeServings } = this.props.dish.recipe
		return(
			<Item onClick={()=> this.props.history.push(`/match/recipe/${recipeID}`)}>
				{ this.props.dish.recipe
					? <React.Fragment>
						  <Item.Image size='small' src={recipePhoto} />
					      <Item.Content>
					        <Item.Header as='a'>{recipeTitle}</Item.Header>
					        <Item.Description>Serves {recipeServings}</Item.Description>
					        <Item.Extra>
					          <Icon color='green' name='thumbs up' /> { recipeRating }
					        </Item.Extra>
					      </Item.Content>
				      </React.Fragment>
					: null
				}
		    </Item>
		)
	}
}

export default withRouter(Result)