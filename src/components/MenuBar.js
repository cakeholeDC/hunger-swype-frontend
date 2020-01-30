import React from 'react'
import { Segment, Image } from 'semantic-ui-react'

class MenuBar extends React.Component {
	render(){
		return(
			<Segment className="ui inverted teal" id="menu-bar">
				<Image id="user-avatar" src='https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' avatar />
				<p id="menu-bar-text">Hunger Swype™</p>
			</Segment>
		)
	}
}

export default MenuBar