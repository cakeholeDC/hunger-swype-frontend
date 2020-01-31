import React from 'react'
import MenuBar from '../components/MenuBar'
import { connect } from 'react-redux'
import { Image, Button } from 'semantic-ui-react'

class Match extends React.Component {
	state={
		loading: true,
		currentDish: null,
		shownDishes: [],
		interested: [],
		notInterested: []
	}


	getRandomDish = () => {
		if (this.props.dishes.length > 0) {
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
		} else {
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
		this.getRandomDish()
	}

	notInterestedInDish = () => {
		console.log("I'll pass...")
		this.setState({
			notInterested: [...this.state.notInterested, this.state.currentDish]
		})
		this.getRandomDish()
	}


	render(){
		return( this.state.currentDish
			? <React.Fragment>
				<MenuBar/>
				<div className="match-page-container">
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
				</React.Fragment>
			: this.getRandomDish()
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    dishes: state.dishes
  }
}

export default connect(mapStateToProps)(Match)