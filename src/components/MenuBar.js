import React from 'react'
import { Segment, Image, Icon } from 'semantic-ui-react'
import { returnHome } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const fallbackAvatar = "https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"

class MenuBar extends React.Component {
	// state={
	// 	showMenu: false
	// }

	toggleUserActionMenu = () => {
		this.props.history.push('/profile')
		// console.log("Toggling User Action Menu", !this.state.showMenu)
		// this.setState({
		// 	showMenu: !this.state.showMenu
		// })
	}

	render(){
		return(
			<Segment 
				className="ui inverted"
				id="menu-bar"
			>
				{ this.props.currentUser ?
					<React.Fragment>
						<Icon name="home" size="large" className="menu-bar-home"/>
						<Image
							id="user-avatar"
							src={ this.props.currentUser.avatar ? this.props.currentUser.avatar : fallbackAvatar } 
							avatar
							onClick={ () => this.toggleUserActionMenu() }
						/>
					</React.Fragment>
					: null
				}
				<p
					id="menu-bar-text"
					onClick={ () => this.props.match.url === '/' ? this.props.returnHome() : this.props.history.push('/') }
				>
					Hunger Swype™
				</p>

			</Segment>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    progress: state.progress,
  }
}

const mapDispatchToProps = (dispatch) => ({
	returnHome: () => { dispatch(returnHome()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuBar))