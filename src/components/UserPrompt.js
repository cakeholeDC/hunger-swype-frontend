import React from 'react'
import { Header } from 'semantic-ui-react'

class UserPrompt extends React.Component {
	render(){
		return(
			<div className="user-prompt">
				<Header as='h1'>
					{ this.props.prompt }
				</Header>
				<Header as='h3'>
					{ this.props.secondary ? this.props.secondary : null}
				</Header>
			</div>
		)
	}
}

export default UserPrompt