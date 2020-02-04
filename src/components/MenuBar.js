import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import { returnHome } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class MenuBar extends React.Component {
	state={
		showMenu: false
	}

	toggleUserActionMenu = () => {
		this.setState({
			showMenu: !this.state.showMenu
		})
	}

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
					onClick={ () => this.toggleUserActionMenu() }
					/>
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