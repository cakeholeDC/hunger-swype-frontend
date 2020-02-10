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

	toggleNewAccountForm = (event) => {
		event.preventDefault()
		this.setState({
			isNewAccount: !this.state.isNewAccount,
			formIsValid: true
		})
	}

	onFormChange(event){
		this.setState({
			[event.target.name]: event.target.value,
			formIsValid: true
		})
	}

	emailIsValid(email) {
		console.log('validating email')
	 if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)) 
		{	
			console.log('valid')
			return (true)
		} else {
			return (false)
		}
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		console.log("validating onFormSubmit...")
		const checkFields = !this.state.isNewAccount ? ['username', 'password'] : ['username', 'password', 'name', 'email', 'region',]
		let canSubmit = true
		checkFields.forEach(field => {
			if (this.state[field] === ''){
				canSubmit = false
			}
		})

		if (!canSubmit) {
			this.setState({
				formIsValid: false
			})
		}
		if (canSubmit) {
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
												error={ !this.state.formIsValid && !this.emailIsValid(this.state.email)
													? {
												      content: `Please enter a valid email address.`,
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
										/>
										</Form.Group>
									</React.Fragment>
									: null
								}
								{
									this.state.isNewAccount
									? <div className="signup-btn-container"> 
										<Button type="button" onClick={ (event) => this.toggleNewAccountForm(event) } negative >Cancel</Button>
										<Button type="submit" onClick={ () => console.log("sign up") } primary >Sign Up</Button>
									</div>
									: <div className="login-btn-container"> 
									    <Button type="submit" primary >
									    		Let's Eat!
									    </Button>
									    <p className="sign-up-link"><a onClick={(event) => this.toggleNewAccountForm(event) }>Don't have an account?</a></p>
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