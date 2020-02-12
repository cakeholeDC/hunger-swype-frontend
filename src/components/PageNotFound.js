import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class PageNotFound extends React.Component {
	
	render(){
		return(
			<div id="page-404" >
				<div id="page-404-content">
					<React.Fragment>
						<h1 className="yellow-header" id="app-name">Whoops.</h1>
						<Header as="h2">That page is out to lunch</Header>
						<Button
							positive
							className="return-home-btn"
							content="Hunger Swype Home"
							onClick={ () => this.props.history.push(`/`)} />
					</React.Fragment>
				</div>
			</div>
		)
	}
}

export default withRouter(PageNotFound)

//<Image src="Logo-mock.jpg" />