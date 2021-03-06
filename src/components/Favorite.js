import React from 'react'
import { Item, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleFavorite } from '../redux/actions.js'

class Favorite extends React.Component {
	render(){
		return(
			<Item 
				className="recipe-result"
			> 
				{ this.props.recipe
					? <React.Fragment>
						  <Item.Image size='small' src={this.props.recipe.photo} onClick={()=> this.props.history.push(`/match/recipe/${this.props.recipe.id}`)}/>
					      <Item.Content>
					        <Item.Header onClick={()=> this.props.history.push(`/match/recipe/${this.props.recipe.id}`)}>{this.props.recipe.title}</Item.Header>
					        <Item.Description  >Ready in {this.props.recipe.cook_time} minutes</Item.Description>
					        <Item.Description>Serves {this.props.recipe.servings}</Item.Description>
					        <Item.Extra className="profile-favorite-icons">
					        	<span className="favorites-toggle" onClick={ () => this.props.toggleFavorite(this.props.currentUser.id, this.props.recipe) }>
					          	    <Icon 
					          	    	color="red" 
					          	    	name={ this.props.currentUser 
					          	    				? this.props.currentUser.favorite_recipes.includes(this.props.recipe) 
					          	    					? "heart"
					          	    					: "heart outline" 
				          	    					: null
			          	    				 }
		      	    				/> Flavourite
				          	    </span>
								<span className="gray-text recipe-rating">
						            <Icon color='green' name='thumbs up' /> { this.props.recipe.rating }%
								</span>
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

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (userID, recipe) => { dispatch(toggleFavorite(userID, recipe)) }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorite))
// export default Favorite