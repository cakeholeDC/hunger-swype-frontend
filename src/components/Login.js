import React from 'react'
import MenuBar from '../components/MenuBar'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { Form, Button, Container, Header } from 'semantic-ui-react'
import { processLoginForm, processNewUserForm } from '../redux/actions'

class Login extends React.Component{
	state={
		isNewAccount: false,
		formIsValid: true,
		username: '',
		password: '',
		name: '',
		email: '',
		region: '',
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
		console.log("validating onFormSubmit...")
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
			let userFormData

			let fallbackImg = 'https://f4.bcbits.com/img/a1368582765_10.jpg'
			
			if (this.state.isNewAccount){
				 userFormData = {
					username: this.state.username,
					password: this.state.password,
					name: this.state.name,
					region: this.state.region,
					birthdate: this.state.birthdate,
					avatar: this.state.avatar !== '' ? this.state.avatar : fallbackImg,
				}
				this.props.processNewUserForm(userFormData)
			} else {
				 userFormData = {
					username: this.state.username,
					password: this.state.password
				}
				this.props.processLoginForm(userFormData)
			}
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
								error={ !this.state.formIsValid && this.state.username === '' 
									? {
								      content: 'Please enter a username',
								      pointing: 'above',
								    }
									: null
								}

							/>
							<Form.Input 
								fluid 
								type="password"
								name="password" 
								label="Password"
								placeholder="password123"
								error={ !this.state.formIsValid && this.state.password === ''
									? {
								      content: 'Please enter a password',
								      pointing: 'above',
								    }
								    : null
								}
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
										error={ !this.state.formIsValid && this.state.name === ''
											? {
										      content: 'Full name is required',
										      pointing: 'above',
										    }
										    : null
										}
									/>
									<Form.Input 
										fluid 
										name="email" 
										label="Email"
										placeholder="jdoe@gmail.com"
										error={ !this.state.formIsValid && this.state.birthdate === ''
											? {
										      content: 'Please enter a valid email address',
										      pointing: 'above',
										    }
										    : null
										}
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Input 
										fluid 
										name="region" 
										label="Region"
										placeholder="Washington, DC"
										error={ !this.state.formIsValid && this.state.region === ''
											? {
										      content: 'Please enter a region',
										      pointing: 'above',
										    }
										    : null
										}
									/>
								<Form.Input 
									fluid 
									name="avatar" 
									label="Avatar"
									placeholder="www.sweetpics.com/yourimage.jpg"
									error={ !this.state.formIsValid && this.state.avatar === ''
										? {
									      content: 'Please select a super cool avatar',
									      pointing: 'above',
									    }
									    : null
									}
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
							    <Button type="submit" primary >
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

const mapDispatchToProps = (dispatch) => ({
	processLoginForm: (user) => { dispatch(processLoginForm(user)) },
	processNewUserForm: (user) => { dispatch(processNewUserForm(user)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)