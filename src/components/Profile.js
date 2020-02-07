import React from 'react'
import MenuBar from './MenuBar'
import { Image, Header, Container, Divider, Icon, Button, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logOutUser } from '../redux/actions'
import Favorite from './Favorite.js'
import { Redirect } from 'react-router-dom'

class Profile extends React.Component {

	render(){
		console.log("profile=>", this.props)
		return(
			!this.props.currentUser
			? <Redirect to="/login" />
			: <React.Fragment>
				<MenuBar/>
				<div id="profile-page-container">
				<Image 
				 	fluid
				 	src={ this.props.currentUser.avatar }
				 	className="profile-image"
			 	/>
			 	<Container className="profile-page">
					<Header as="h1" className="profile-username">
						Chef de Cuisine,<br/>{ this.props.currentUser.username }
					</Header>
					<Header as="h3" className="profile-name">
						{ this.props.currentUser.name }
					</Header>
					<p className="gray-text">
						{ this.props.currentUser.region }
					</p>

					<Button animated='fade' onClick={ this.props.logOutUser } negative>
				      <Button.Content hidden>Log Out</Button.Content>
				      <Button.Content visible>
				        <Icon name='log out' />
				      </Button.Content>
				    </Button>

					<Divider horizontal className="profile-favorites-header">
				      <Header as='h4' >
				        <Icon name='heart' size='mini' />
							Favorites 
					  </Header>
				    </Divider>
					<Item.Group>
						{  this.props.currentUser.favorite_recipes.map(recipe => <Favorite key={recipe.api_id} recipe={recipe} />)  }
					</Item.Group>
					
				</Container>
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
  logOutUser: () => { dispatch(logOutUser()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)