import React from 'react'
import { Segment, Image, Icon } from 'semantic-ui-react'
import { home } from '../redux/actions'
import store from '../redux/store'
import { withRouter } from 'react-router-dom'

class MenuBar extends React.Component {
	render(){
		return(
			<Segment 
				className={ this.props.match.url === '/match' ? "ui inverted teal match-menu" : "ui inverted teal"}
				id="menu-bar"
			>
				<Image
					id="user-avatar"
					src='https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' 
					avatar
					onClick={ () => console.log('toggle user action menu')}
					/>
				<p
					id="menu-bar-text"
					onClick={ () => this.props.match.url === '/' ? store.dispatch(home()) : this.props.history.push('/') }
				>
					Hunger Swype™
				</p>
			</Segment>
		)
	}
}

export default withRouter(MenuBar)