import React from 'react'
import MenuBar from './MenuBar'
import Result from './Result'
import { connect } from 'react-redux'
import { Image, Button, Item, Header } from 'semantic-ui-react'
import { getResultsPage } from '../redux/actions'

class Match extends React.Component {
	state={
		loading: true,
		currentDish: null,
		shownDishes: [],
		interested: [],
		notInterested: []
	}

	getRandomDish = () => {
		// if there are options to show
		if (this.props.dishes.length > 0) {

			// if user has been shown all the options
			if (this.props.dishes.length === this.state.shownDishes.length){
				console.log("no more dishes to show")
				return null
			} else {
				const dishArray = this.props.dishes

				let dish = dishArray[Math.floor(Math.random() * dishArray.length)]

				while (this.state.shownDishes.includes(dish)) {
					console.log("dish already displayed... getting another")
					dish = dishArray[Math.floor(Math.random() * dishArray.length)]
				}
				this.setState({
					currentDish: dish,
					shownDishes: [...this.state.shownDishes, dish]
				})

				
				return null
			}
		} else {
			console.log("no dishes found")
			return null
		}
	}

	getDishImage(dish){
		return dish.photo
	}

	interestedInDish = () => {
		console.log("I'd eat that!")
		this.setState({
			interested: [...this.state.interested, this.state.currentDish]
		})
		if (this.state.interested.length + 1 === 5){
			this.props.getResultsPage()
		} else {
			this.getRandomDish()
		}
	}

	notInterestedInDish = () => {
		console.log("I'll pass...")
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
					: <React.Fragment>
						<Header as="h2">Here's some ideas for you:</Header>
						<Item.Group divided>
							{ this.state.interested.map(dish => <Result dish={dish} /> ) }
						</Item.Group> 
					</React.Fragment>
				}
				</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    dishes: state.dishes,
    progress: state.progress
  }
}

const mapDispatchToProps = (dispatch) => ({
	getResultsPage: () => { dispatch(getResultsPage()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Match)