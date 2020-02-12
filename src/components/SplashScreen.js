import React from 'react'
import { Button, Loader, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class SplashScreen extends React.Component {
	
	render(){
		console.log(this.props)
		return(
			<div id="splash-container" >
				<div id="splash-content">
					{ !this.props.error
						? <React.Fragment>
							<h1 className="yellow-header" id="app-name">Hunger<br/>Swype</h1>
							<Loader 
								indeterminate 
								active
								inline='centered'>
							{
								this.props.running 
									? "Running Flavour Algorithm..." 
									: "Preparing Flavour Algorithms..."
							}
							</Loader>
						</React.Fragment>
						: <React.Fragment>
							<h1 className="yellow-header" id="app-name">Congrats.</h1>
							<Header as="h2">You stumped the algorithm.</Header>
							<p>What are you, some sort of data scientist?</p>
							<Button
								positive
								className="return-home-btn"
								content="Maybe it's time to experience some new flavours..."
								onClick={ () => this.props.history.push(`/`)} />
						</React.Fragment>
					}
				</div>
			</div>
		)
	}
}

export default withRouter(SplashScreen)

//<Image src="Logo-mock.jpg" />