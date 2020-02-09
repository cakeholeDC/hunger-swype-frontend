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
		// const validity = !this.state.formIsValid ? true : false
		this.setState({
			isNewAccount: !this.state.isNewAccount,
			// formIsValid: validity
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

			let fallbackImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
			
			if (this.state.isNewAccount){
				 userFormData = {
					username: this.state.username,
					password: this.state.password,
					name: this.state.name,
					email: this.state.email,
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
						<div id="login-page">
						<h1 className="yellow-header" id="app-name">Hunger<br/>Swype</h1>
						<div className="login-content">
							<Form 
								className="login-form"
								onChange={ event => this.onFormChange(event) }
								onSubmit={ this.onFormSubmit } >
								<Form.Group widths='equal'>
									<Form.Input 
										fluid 
										name="username" 
										label="Username"
										placeholder="dc_foodie"
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
												error={ !this.state.formIsValid && this.state.email === ''
													? {
												      content: `Please enter a valid email address. We'll only use it for product updates.`,
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
											placeholder="www.sweetpics.com/avatar.jpg"
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
									? <div className="signup-btn-container"> 
										<Button floated="left" onClick={ () => this.toggleNewAccountForm() } negative >Cancel</Button>
										<Button type="submit" floated="right" onClick={ () => console.log("sign up") } primary >Sign Up</Button>
									</div>
									: <div className="login-btn-container"> 
									    <Button type="submit" primary >
									    		Let's Eat!
									    </Button>
									    <p className="sign-up-link"><a onClick={() => this.toggleNewAccountForm() }>Don't have an account?</a></p>
								    </div>
								}
							</Form>
						</div>
					</div>
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