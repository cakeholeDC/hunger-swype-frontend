import React from 'react'
import MenuBar from '../components/MenuBar'
import { Header, Button } from 'semantic-ui-react'


class About extends React.Component{

	getCurrentYear(){
		return new Date().getFullYear()
	}
	render(){
		return(
			<React.Fragment>
			<MenuBar />
			<div className="about-container">
				<h1 className="yellow-header" id="app-name">Hunger<br/>Swype</h1>
				<div className="about-hunger-swype">
					<h4>Hunger Swype is <em>flavour dating.</em></h4>
					<p>Start out by providing our flavour algorithm with your dietary restrictions. Then let us know what you're looking for and Hunger Swype will present you with a series of delicious looking photos.</p>
					<p>You decide if that dish looks appetizing. Hunger Swype’s flavour algorithm will match you with recipes to cook.</p>
					<p>No more arguments over what's for dinner. No more frozen pizzas from the bodega on the corner (unless you're into that).</p>
					<p>No more trusting recommendations from that one friend who lived in the neighborhood ten years ago (Looking at you, Scott).</p>
					<p>Let your appetite drive your flavour profile!</p>
				<div className="credits">
					<p>Hunger Swype &copy;{this.getCurrentYear()} <a href="https://www.kylepcole.com/" target="_blank">Kyle P. Cole</a></p>
					<p><small>version 0.1.2</small></p>
				</div>
				</div>
				<Button
					positive
					className="return-home-btn"
					content="Alright, let's get started!"
					onClick={ () => this.props.history.push(`/`)} />
			</div>
			</React.Fragment>

		)
	}
}

export default About