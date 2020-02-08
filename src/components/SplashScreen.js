import React from 'react'
import { Container, Loader, Header } from 'semantic-ui-react'

class SplashScreen extends React.Component {
	
	render(){
		return(
			<Container id="splash-container" >
				<div id="splash-content">
					<h1 className="yellow-header" id="app-name">Hunger<br/>Swype</h1>
					<Loader indeterminate active inline='centered'>{ this.props.running ? "Running Flavor Algorithm..." : "Preparing Flavour Algorithms..."}</Loader>
				</div>
			</Container>
		)
	}
}

export default SplashScreen

//<Image src="Logo-mock.jpg" />