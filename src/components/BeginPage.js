import React from 'react'
import UserPrompt from './UserPrompt'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { proceedToFilters } from '../redux/actions'
// import store from '../redux/store'



class BeginPage extends React.Component {
	render(){
		return(
			<div className="content-container">
				<UserPrompt prompt={this.props.currentUser ? `Welcome, ${this.props.currentUser.username}` : "Welcome"} secondary="Start a Hunger Swype!" />
				{ this.props.diets.length !== 0 || this.props.cuisines.length !== 0 || this.props.courses.length !== 0
					? <Button 
						circular
						positive
						className="massive single-user-action"
						onClick={ () => this.props.proceedToFilters() }
						icon='food'
					/>
					: <Button 
						circular
						disabled
						positive
						className="massive single-user-action"
						onClick={ () => this.props.proceedToFilters() }
						icon='food'
					/>
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    progress: state.progress,
    dishes: state.dishes,
	diets: state.diets,
	cuisines: state.cuisines,
	courses: state.courses
  }
}

const mapDispatchToProps = (dispatch) => ({
	proceedToFilters: () => { dispatch(proceedToFilters()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(BeginPage)