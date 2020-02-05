import React from 'react'
import MenuBar from '../components/MenuBar'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { Form, Button, Container, Image, Header } from 'semantic-ui-react'

class Login extends React.Component{
	state={
		isNewAccount: false,
		formIsValid: true,
		username: '',
		password: '',
		name: '',
		email: '',
		region: '',
		birthdate: '',
		avatar: ''
	}

	toggleNewAccountForm = () => {
		this.setState({
			isNewAccount: !this.state.isNewAccount
		})
	}

	onFormChange(event){
		console.log(event.target.name, event.target.value)
		this.setState({
			[event.target.name]: event.target.value,
			formIsValid: true
		})
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		const checkFields = !this.state.isNewAccount ? ['username', 'password'] : ['username', 'password', 'name', 'email', 'region', 'birthdate', 'avatar']
		let canSubmit = false
		checkFields.forEach(field => {
			if (this.state[field] === ''){
				this.setState({
					formIsValid: false
				})
			} else {
				canSubmit = true
			}
		})

		if (canSubmit) {
			console.log("submitting form!")
		}
	}


	render(){
		console.log("loaded login page")
		return( this.props.currentUser 
				? <Redirect to="/" />
				: <React.Fragment>
					<MenuBar />
					<Header as='h1' className="user-prompt" id="app-name">Hunger<br/>Swype</Header>
					
					<Container>
					<Form 
						className="login-form"
						onChange={ event => this.onFormChange(event) }
						onSubmit={ this.onFormSubmit }
					>
						<Form.Group widths='equal'>
							<Form.Input 
								fluid 
								name="username" 
								label="Username"
								placeholder="cakehole"
								error={ this.state.username === '' 
									? null
									: {
							      content: 'Please enter a username',
							      pointing: 'below',
							    }}
							/>
							<Form.Input 
								fluid 
								type="password"
								name="password" 
								label="Password"
								placeholder="password123"
								error={ this.state.formIsValid 
									? null
									: {
							      content: 'Please enter a password',
							      pointing: 'below',
							    }}
							/>
						</Form.Group>
						{ this.state.isNewAccount 
							? <React.Fragment>
								<Form.Group widths='equal'>
									<Form.Input 
										fluid 
										name="name" 
										label="Full Name"
										placeholder="John Doe"
										error={ this.state.formIsValid 
											? null
											: {
									      content: 'Full name is required',
									      pointing: 'below',
									    }}
									/>
									<Form.Input 
										fluid 
										name="email" 
										label="Email Address"
										placeholder="jdoe@goodfood.com"
										error={ this.state.formIsValid 
											? null
											: {
									      content: 'Please enter a valid email address',
									      pointing: 'below',
									    }}
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Input 
										fluid 
										name="region" 
										label="Region"
										placeholder="Washington, DC"
										error={ this.state.formIsValid 
											? null
											: {
									      content: 'Please enter a region',
									      pointing: 'below',
									    }}
									/>
									<Form.Input 
										fluid 
										type="date"
										name="birthdate" 
										label="Birthdate"
										placeholder="July 4, 1776"
										error={ this.state.formIsValid 
											? null
											: {
									      content: 'Please enter a birthdate',
									      pointing: 'below',
									    }}
									/>
								<Form.Input 
									fluid 
									name="avatar" 
									label="Avatar"
									placeholder="www.sweetpics.com/yourimage.jpg"
									error={ this.state.formIsValid 
										? null
										: {
								      content: 'Please select a super cool avatar',
								      pointing: 'below',
								    }}
								/>
								</Form.Group>
							</React.Fragment>
							: null
						}
						{
							this.state.isNewAccount
							? <React.Fragment> 
								<Button type="submit" floated="right" onClick={ () => console.log("sign up") } primary >Sign Up</Button>
								<Button type="submit" floated="left" onClick={ () => this.toggleNewAccountForm() } negative >Cancel</Button>
								<div>&nbsp;</div>
							</React.Fragment>
							: <React.Fragment>
							    <Button type="submit" onClick={ () => console.log('log in') } primary >
							    		Let's Eat!
							    </Button>
							    <p><a onClick={() => this.toggleNewAccountForm() }>Don't have an account?</a></p>
						    </React.Fragment>
						}
					</Form>
					</Container>
				  </React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Login)