import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import { returnHome } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const fallbackAvatar = "https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"

class MenuBar extends React.Component {

	redirectToProfilePage = () => {
		this.props.history.push('/profile')
	}

	render(){
		
		return(
			<Segment 
				className="ui inverted"
				id="menu-bar"
			>
				{ this.props.currentUser
					? <Image
							id="user-avatar"
							src={ this.props.currentUser.avatar ? this.props.currentUser.avatar : fallbackAvatar } 
							avatar
							onClick={ () => this.redirectToProfilePage() }
						/>
					: <img 
							alt="hs-logo-small"
							src="small-logo.png	" 
							className ="menu-bar-logo"
							onClick={ () => this.props.match.url === '/' ? this.props.returnHome() : this.props.history.push('/') }
						/>
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