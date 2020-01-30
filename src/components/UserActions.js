import React from 'react'
import { Button } from 'semantic-ui-react'
// import { ACTION FUNCTION } from '../redux/actions'

class UserActions extends React.Component {
	render(){
		console.log("UserActions", this.props)

		return(
			<React.Fragment>
			<div>
				<Button positive fluid onClick={ () => console.log("yes")}>Yes</Button>
			</div>
			<div>
				<Button negative fluid onClick={ () => console.log("no")}>No></Button>
			</div>
			</React.Fragment>
		)

	}
}

export default UserActions