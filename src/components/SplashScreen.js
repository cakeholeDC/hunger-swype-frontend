import React from 'react'
import { Container, Loader, Header } from 'semantic-ui-react'

class SplashScreen extends React.Component {
	
	render(){
		return(
			<Container id="splash-container" >
				<div id="splash-content">
					<Header as='h1' className="app-name">Hunger<br/>Swype</Header>
					<Loader active inline='centered'>Preparing Flavour Algorithms...</Loader>
				</div>
			</Container>
		)
	}
}

export default SplashScreen

//<Image src="Logo-mock.jpg" />