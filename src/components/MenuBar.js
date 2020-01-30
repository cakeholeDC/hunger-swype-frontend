import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import { home } from '../redux/actions'
import store from '../redux/store'

class MenuBar extends React.Component {
	render(){
		return(
			<Segment className="ui inverted teal" id="menu-bar">
				<Image
					id="user-avatar"
					src='https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' 
					avatar
					onClick={ () => console.log('toggle user action menu')}
					/>
				<p
					id="menu-bar-text"
					onClick={ () => store.dispatch(home()) }
				>
					Hunger Swype™
				</p>
			</Segment>
		)
	}
}

export default MenuBar