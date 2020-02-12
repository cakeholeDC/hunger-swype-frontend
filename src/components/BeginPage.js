import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { proceedToFilters } from '../redux/actions'
import { withRouter } from 'react-router-dom'


class BeginPage extends React.Component {
	render(){
		return(
			<div id="start-page">
				<div className="content">
					<h1 className="yellow-header" id="app-name">Hunger<br/>Swype</h1>
					<p className="blink_me">LET'S EAT!</p>
					{ this.props.diets.length !== 0 || this.props.cuisines.length !== 0 || this.props.courses.length !== 0
						? <Button 
							circular
							positive
							className="massive" id="start-swype-btn"
							onClick={ () => this.props.proceedToFilters() }
							icon='food'
						/>
						: <Button 
							circular
							disabled
							positive
							className="massive" id="start-swype-btn"
							onClick={ () => this.props.proceedToFilters() }
							icon='food'
						/>
					}
					<p id="about-page-link" href="#" onClick={ () => this.props.history.push(`/about`) }>I'm new here, how's this work?</p>
				</div>
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

