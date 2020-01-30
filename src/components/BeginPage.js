import React from 'react'
import UserPrompt from './UserPrompt'
import UserActions from './UserActions'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { begin } from '../redux/actions'
import store from '../redux/store'



class BeginPage extends React.Component {
	render(){
		console.log("BeginPage", this.props)

		return(
			<React.Fragment>
				<UserPrompt prompt={`Welcome, ${this.props.currentUser.username}`} secondary="Start a Hunger Swype!" />
				<Button 
					circular
					positive
					className="massive"
					onClick={ () => store.dispatch(begin()) }
					icon='food'
				/>
			</React.Fragment>
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