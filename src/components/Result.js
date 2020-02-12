import React from 'react'
import { Item, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Result extends React.Component {
	render(){
		const { id: recipeID, photo: recipePhoto, title: recipeTitle, rating: recipeRating, servings: recipeServings, cook_time: cookTime } = this.props.dish.recipe
		return(
			<Item 
				onClick={()=> this.props.history.push(`/match/recipe/${recipeID}`)}
				className="recipe-result"
			>
				{ this.props.dish.recipe
					? <React.Fragment>
						  <Item.Image size='small' src={recipePhoto} />
					      <Item.Content>
					        <Item.Header  as='h1' className="single-result-title">{recipeTitle}</Item.Header>
					        <Item.Description  >Ready in {cookTime} minutes | Serves {recipeServings}</Item.Description>
					        <Item.Extra >
					          <Icon color='green' name='thumbs up' /> { recipeRating }%
					        </Item.Extra>
					      </Item.Content>
				      </React.Fragment>
					: null
				}
		    </Item>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(Result))