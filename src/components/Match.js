import React from 'react'
import MenuBar from './MenuBar'
import Result from './Result'
import { connect } from 'react-redux'
import { Image, Button, Item } from 'semantic-ui-react'
import { getResultsPage, showUserMatches } from '../redux/actions'
import SplashScreen from './SplashScreen.js'
import { withRouter } from 'react-router-dom'
import iziToast from 'izitoast'


class Match extends React.Component {
	state={
		loading: true,
		currentDish: null,
		shownDishes: [],
		interested: [],
		notInterested: []
	}

	getRandomDish = () => {
		let checked = false
		//check if even have dishes
		if (this.props.dishes.length === 0){
			return checked ? <SplashScreen error message="out-of-dishes"/> : <SplashScreen running/>
			checked = true
		} else if (this.props.dishes.length > 0) {
		// then check if there are more options to show

			// if user has been shown all the options
			if (this.props.dishes.length === this.state.shownDishes.length){
				// return null
				// return <SplashScreen error message="out-of-dishes"/>
				iziToast.info({
					title: "You're being too picky",
				    message: "Let's try this again.",
				    timeout: 5000,
				    resetOnHover: true,
				    transitionIn: 'fadeInDown',
				    transitionOut: 'fadeOutUp',
				    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
				})
				setTimeout(() => { this.props.history.push('/') }, 5500)
			} else {
				const dishArray = this.props.dishes

				let dish = dishArray[Math.floor(Math.random() * dishArray.length)]

				while (this.state.shownDishes.includes(dish)) {
					dish = dishArray[Math.floor(Math.random() * dishArray.length)]
				}
				this.setState({
					currentDish: dish,
					shownDishes: [...this.state.shownDishes, dish]
				})

				return null
			}
		}
	}

	getDishImage(dish){
		return dish.photo
	}

	interestedInDish = () => {
		this.setState({
			interested: [...this.state.interested, this.state.currentDish]
		})
		if (this.state.interested.length + 1 === 5){
			this.props.getResultsPage()
			this.props.showUserMatches([...this.state.interested, this.state.currentDish])
		} else {
			this.getRandomDish()
		}
	}

	notInterestedInDish = () => {
		this.setState({
			notInterested: [...this.state.notInterested, this.state.currentDish]
		})
		this.getRandomDish()
	}


	render(){
		return( !this.state.currentDish
			? this.getRandomDish()
			: <React.Fragment>
				<MenuBar />
				{ this.props.progress === "match" 
					? <div className="match-page-container">
					 <Image 
					 	fluid
					 	src={ this.state.currentDish ? this.getDishImage(this.state.currentDish) : 'https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg'}
					 	className="match-image"
				 	/>
						 <h1 className="match-prompt-label">Does this look appetizing?</h1>
						 <div className="match-btn-container">
						 <Button 
							circular
							negative
							id="match-no"
							className="massive"
							onClick={ this.notInterestedInDish }
							icon='thumbs down'
						/>
						
						<Button 
							circular
							positive
							id="match-yes"
							className="massive"
							onClick={ this.interestedInDish }
							icon='thumbs up'
						/>
						</div>
					  </div>
					: <div className="match-results-container">
						<h2 className="yellow-header" id="match-results">Bon Appétit!</h2>
						<Item.Group divided className="results-listing">
							{ this.props.matches.map(dish => <Result key={dish.api_id} dish={dish} /> ) }
						</Item.Group>
						<div>&nbsp;</div> 
					</div>
				}
				</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    dishes: state.dishes,
    progress: state.progress,
    matches: state.matches
  }
}

const mapDispatchToProps = (dispatch) => ({
	getResultsPage: () => { dispatch(getResultsPage()) },
	showUserMatches: (matches) => { dispatch(showUserMatches(matches)) },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Match))