import React from 'react'
import { Form, Button, Modal, Image } from 'semantic-ui-react'
import { logOutUser, processNewUserForm, processUserUpdateForm } from '../redux/actions'
import { toTitleCase, emailIsValid } from '../utils/Helpers.js'
import { connect } from 'react-redux'
import iziToast from 'izitoast'


class UserForm extends React.Component {
	state={
		isNewAccount: false,
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
				// password: this.props.currentUser.password,
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

	formIsValid = () => {
		let valid = true
		
		let fields = ['name','email','region']
		
		if (this.props.newAccount){
			fields.unshift("username", "password")
		}

		let errors = []
		fields.forEach(field => {

			if (field === "email") {

				if (!emailIsValid(this.state[field])) {
					iziToast.error({
						title: "Error",
					    message: "Email is not valid",
					    timeout: 5000,
					    resetOnHover: true,
					    transitionIn: 'fadeInDown',
					    transitionOut: 'fadeOutUp',
					    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
					})
					valid = false
					errors.push(field)
				}
			} else if (this.state[field] === '') {
				valid = false
				if (!errors.includes(field)){
					errors.push(field)
				} 
			}
		})
		
		if (errors.length > 0) {
			let titleCasedFields = errors.map(field => toTitleCase(field))	
			iziToast.warning({
				title: "Whoops",
			    message: `${titleCasedFields.join(', ')} ${errors.length > 1 ? errors.length > 2 ? " are all" : "are both " : " is"} required`,
			    timeout: 5000,
			    resetOnHover: true,
			    transitionIn: 'fadeInDown',
			    transitionOut: 'fadeOutUp',
			    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
			})
		} else {
			iziToast.success({
				title: "Success",
			    message: `${ this.props.newAccount ? "Flavour Profile Created" : "Flavour Profile Updated"}`,
			    timeout: 3000,
			    resetOnHover: false,
			    transitionIn: 'fadeInDown',
			    transitionOut: 'fadeOutUp',
			    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
			})
		}

		return valid
	}

	onFormSubmit = (event) => {
		event.preventDefault()

		if (this.formIsValid()){

			let defaultAvatar = 'default-avatar.png'
			let userFormData

			if (this.props.newAccount){
				userFormData = {
					username: this.state.username,
					password: this.state.password,
					name: this.state.name,
					email: this.state.email,
					region: this.state.region,
					avatar: this.state.avatar !== '' ? this.state.avatar : defaultAvatar,
				}
				this.props.processNewUserForm(userFormData)
				setTimeout(this.props.closeModal, 500)
			} else if (this.props.edit) {
				userFormData = {
					id: this.props.currentUser.id,
					username: this.state.username,
					name: this.state.name,
					email: this.state.email,
					region: this.state.region,
					avatar: this.state.avatar !== '' ? this.state.avatar : defaultAvatar,
				}
				this.props.processUserUpdateForm(userFormData)
				setTimeout(this.props.closeModal, 500)
			}
		}
	}

	onFormChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render(){
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
		    <Modal.Header>{this.props.newAccount ? "Create " : null }Your Flavour Profile</Modal.Header>
		    <Modal.Content >
		      <Modal.Description>
		        <Form 
					className="user-form"
					onChange={ event => this.onFormChange(event) }
					onSubmit={ event => this.onFormSubmit(event) } >
						<Form.Group widths='equal'>
							<Form.Input 
								fluid 
								name="username" 
								label="Username"
								placeholder="dc_foodie"
								value={ this.state.username }
								disabled={ this.props.edit ? true : false }
								error={ this.props.edit ? {content: "Username cannot be changed", pointing:'above'} : false }
							/>
							{ !this.props.edit
								? <Form.Input 
									fluid 
									type={ this.props.newAccount ? "password" : 'text' }
									name="password" 
									label="Password"
									placeholder="password123"
									value={ this.state.password }
								/>
								: null
							}
						</Form.Group>
						{ this.props.newAccount || this.props.edit
							? <React.Fragment>
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
								{ this.props.edit 
									? <div id="user-form-action-container">
										<Button type="submit" primary floated="right">Update Profile</Button>
									</div>
									: <div id="user-form-action-container"> 
										<Button type="button" onClick={ this.props.closeModal } negative >Cancel</Button>
										<Button type="submit" primary >Sign Up</Button>
									</div>
								}
							</React.Fragment>
							: <div className="login-btn-container"> 
							    <Button type="submit" primary >
							    		Let's Eat!
							    </Button>
							    <p className="sign-up-link" onClick={(event) => this.toggleNewAccount(event) }>Don't have an account?</p>
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
  processNewUserForm: (user) => { dispatch(processNewUserForm(user)) },
  processUserUpdateForm: (user) => { dispatch(processUserUpdateForm(user)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)