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
					<div id="profile-page">
					<Image 
					 	fluid
					 	src={ this.props.currentUser.avatar }
					 	className="profile-image"
				 	/>
				 	<div className="profile-data">
						<h1 className="yellow-header" id="profile-username">
							Chef de Cuisine,<br/>{ this.props.currentUser.username }
						</h1>
						<div className="profile-attributes">
							<Header as="h3" className="profile-name">
								{ this.props.currentUser.name }
							</Header>
							<p className="gray-text">
								{ this.props.currentUser.region }
							</p>
						</div>
						<div className="profile-btn-container">
						<Button onClick={ () => console.log('edit') } primary >
					      <Button.Content>Edit Profile <Icon name='edit' /></Button.Content>
					    </Button>
						<Button onClick={ this.props.logOutUser } negative>
					      <Button.Content>Log Out <Icon name='log out' /></Button.Content>
					    </Button>
					    </div>

						<Divider horizontal className="profile-favorites-header">
					      <Header as='h4' >
					        <Icon name='heart' size='mini' />
								Favorites 
						  </Header>
					    </Divider>
						<Item.Group>
							{  this.props.currentUser.favorite_recipes.map(recipe => <Favorite key={recipe.api_id} recipe={recipe} />)  }
						</Item.Group>
						
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
  logOutUser: () => { dispatch(logOutUser()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)