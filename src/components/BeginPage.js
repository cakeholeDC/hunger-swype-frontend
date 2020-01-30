import React from 'react'
import UserPrompt from './UserPrompt'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { filter } from '../redux/actions'
import store from '../redux/store'



class BeginPage extends React.Component {
	render(){
		console.log("BeginPage", this.props)

		return(
			<div className="content-container">
				<UserPrompt prompt={`Welcome, ${this.props.currentUser.username}`} secondary="Start a Hunger Swype!" />
				<Button 
					circular
					positive
					className="massive single-user-action"
					onClick={ () => store.dispatch(filter()) }
					icon='food'
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    progress: state.progress
  }
}

export default connect(mapStateToProps)(BeginPage)