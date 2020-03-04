import React from 'react'
import MenuBar from '../components/MenuBar'
import { Button } from 'semantic-ui-react'
import ContactUs from '../components/ContactUs'


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
					<h3>Hunger Swype is <em>flavour dating.</em></h3>
					<p>A study by John's Hopkins University <a href="https://clf.jhsph.edu/about-us/news/news-2014/study-suggests-home-cooking-main-ingredient-healthier-diet" target="_blank" rel="noopener noreferrer">suggests</a> that cooking at home is the main ingredient for a healthier life.</p>
					<p id="about-quote"><em>“When people cook most of their meals at home, they consume fewer carbohydrates, less sugar and less fat than those who cook less or not at all – even if they are not trying to lose weight”</em></p><p id="about-quote-source">-Julia A. Wolfson, MPP<br/><small>Fellow, Johns Hopkins Center for a Livable Future</small></p>
					<p>We know that when it comes to cooking the problem that most of us face isn't the cooking itself, but rather what to cook. Hunger Swype is here to help!</p>
					<p>Start out by entering your dietary restrictions, then let us know what you're looking for and Hunger Swype will present you with a series of delicious looking photos matching your flavour profile.</p>
					<p>Your only job is to decide whether that dish looks appetizing or not and we'll take it from there. Hunger Swype’s flavour algorithm will match you with suggested recipes.</p>
					<p>No more arguments over what's for dinner. No more frozen pizzas or rotisserie hot-dogs from the bodega around the corner (unless you're into that).</p>
					<p>Let your appetite drive your flavour profile!</p>
				<div className="credits">
					<p>Hunger Swype &copy;{this.getCurrentYear()} <a href="https://www.kylepcole.com/" target="_blank" rel="noopener noreferrer">Kyle P. Cole</a></p>
					<p><small>version 0.1.6</small></p>
				</div>
				<ContactUs />
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