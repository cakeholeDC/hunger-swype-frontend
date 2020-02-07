import React from 'react'
// import UserPrompt from './UserPrompt'
import { Button, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { proceedToFilters } from '../redux/actions'
// import store from '../redux/store'
import { withRouter } from 'react-router-dom'


class BeginPage extends React.Component {
	state={
		blinkState: true
	}

	toggleBlink = () => {
		setTimeout(() => { 
		  this.setState({
		    blinkState: !this.state.blinkState
		  })
		  this.toggleBlink()
		}, 1000);
	}

	componentDidMount(){
		this.toggleBlink()
	}



	redirectToAboutPage = () => {
		this.props.history.push(`/about`)
	}
	render(){
		return(
			<div className="content-container">
				<Header as='h1' className="user-prompt" id="app-name">Hunger<br/>Swype</Header>
				<p className="press-start">
		            { this.state.blinkState 
		              ? "LET'S EAT!"
		              : null
		            }
	            </p>
				{ this.props.diets.length !== 0 || this.props.cuisines.length !== 0 || this.props.courses.length !== 0
					? <Button 
						circular
						positive
						className="massive single-user-action start-swype"
						onClick={ () => this.props.proceedToFilters() }
						icon='food'
					/>
					: <Button 
						circular
						disabled
						positive
						className="massive single-user-action start-swype"
						onClick={ () => this.props.proceedToFilters() }
						icon='food'
					/>
				}
				<a id="about-page-link" onClick={ this.redirectToAboutPage }>I'm new here, how's this work?</a>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BeginPage))


/*<UserPrompt 
	prompt={`Welcome, ${this.props.currentUser.username}`} 
	secondary="Start a Hunger Swype!"
/>*/


