import React from 'react'
import { Form, Button, Container, Header, Modal, TextArea, Image } from 'semantic-ui-react'
import { logOutUser, processLoginForm, processNewUserForm, processUserUpdateForm } from '../redux/actions'

import { connect } from 'react-redux'


class UserForm extends React.Component {
	state={
		isNewAccount: false,
		formIsValid: true,
		username: '',
		password: '',
		name: '',
		email: '',
		region: '',
		avatar: '',
	}

	componentDidMount(){
		if (this.props.currentUser) {
			this.setState({
				username: this.props.currentUser.username,
				password: this.props.currentUser.password,
				name: this.props.currentUser.name,
				email: this.props.currentUser.email,
				region: this.props.currentUser.region,
				avatar: this.props.currentUser.avatar,
			})
		}
	}

	toggleNewAccount = (event) => {
		event.preventDefault()
		this.setState({
			isNewAccount: !this.state.isNewAccount,
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
		// console.log("validating onFormSubmit...")
		// const checkFields = !this.state.isNewAccount ? ['username', 'password'] : ['username', 'password', 'name', 'email', 'region',]
		// let canSubmit = true
		// checkFields.forEach(field => {
		// 	if (this.state[field] === ''){
		// 		canSubmit = false
		// 	}
		// })

		// if (!canSubmit) {
		// 	this.setState({
		// 		formIsValid: false
		// 	})
		// }
		// if (canSubmit) {
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
			} else if (this.props.edit) {
				userFormData = {
					username: this.state.username,
					name: this.state.name,
					email: this.state.email,
					region: this.state.region,
					birthdate: this.state.birthdate,
					avatar: this.state.avatar !== '' ? this.state.avatar : fallbackImg,
				}
				this.props.processUserUpdateForm(userFormData)
			} else {
				 userFormData = {
					username: this.state.username,
					password: this.state.password
				}
				this.props.processLoginForm(userFormData)
			}
		// }
	}

	onFormChange(event){
		this.setState({
			[event.target.name]: event.target.value,
			formIsValid: true
		})
	}

	render(){
		// const { ...this.props }
		// const { formIsValid, username, password, name, email, region, avatar } = this.state.currentUser
		return (
			<Modal
				id="user-form-modal"
				size="mini"
				open={ this.props.openModal }
				closeOnEscape={ true }
	            closeOnDimmerClick={ true }
	            onClose={ () => this.props.closeModal() }
	            closeIcon
			>
		    <Modal.Header>Your Flavour Profile</Modal.Header>
		    <Modal.Content >
		      <Modal.Description>
		        <Form 
					className="user-form"
					onChange={ event => this.onFormChange(event) }
					onSubmit={ () => console.log('user form submit') /*this.onFormSubmit*/ } >
						<Form.Group widths='equal'>
							<Form.Input 
								fluid 
								name="username" 
								label="Username"
								placeholder="dc_foodie"
								value={ this.state.username }
							/>
							{ !this.props.edit
								? <Form.Input 
									fluid 
									type={ this.state.isNewAccount ? "password" : 'text' }
									name="password" 
									label="Password"
									placeholder="password123"
									value={ this.state.password }
								/>
								: null
							}
						</Form.Group>
						{ this.state.isNewAccount || this.props.edit
							? <React.Fragment>
								<Form.Group widths='equal'>
									<Form.Input 
										fluid
										name="name" 
										label="Full Name"
										placeholder="John Doe"
										value={ this.state.name }
									/>
									<Form.Input 
										fluid
										name="email" 
										label="Email"
										placeholder="jdoe@gmail.com"
										value={ this.state.email }
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Input 
										fluid
										name="region" 
										label="Region"
										placeholder="Washington, DC"
										value={ this.state.region }
									/>
									<Form.Input 
										fluid 
										name="avatar" 
										label="Avatar"
										placeholder="www.sweetpics.com/avatar.jpg"
										value={ this.state.avatar }
									/>
									<div className="user-form-avatar">
										<Image size="tiny" src={ this.state.avatar } />
									</div>
								</Form.Group>
								{ this.props.edit 
									? <div id="user-form-action-container">
										<Button type="submit" primary floated="right">Update Profile</Button>
									</div>
									: <div id="user-form-action-container"> 
										<Button type="button" onClick={ (event) => this.toggleNewAccount(event) } negative >Cancel</Button>
										<Button type="submit" primary >Sign Up</Button>
									</div>
								}
							</React.Fragment>
							: <div className="login-btn-container"> 
							    <Button type="submit" primary >
							    		Let's Eat!
							    </Button>
							    <p className="sign-up-link"><a onClick={(event) => this.toggleNewAccount(event) }>Don't have an account?</a></p>
						    </div>
						}
					</Form>
			      </Modal.Description>
			    </Modal.Content>
			</Modal>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => { dispatch(logOutUser()) },
  processLoginForm: (user) => { dispatch(processLoginForm(user)) },
  processNewUserForm: (user) => { dispatch(processNewUserForm(user)) },
  processUserUpdateForm: (user) => { dispatch(processUserUpdateForm(user)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)