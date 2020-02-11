import React from 'react'
import MenuBar from './MenuBar'
import ContactUs from './ContactUs'
import UserForm from './UserForm.js'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { Form, Button, Container, Header, Modal, TextArea } from 'semantic-ui-react'
import { processLoginForm, processNewUserForm } from '../redux/actions'
import iziToast from 'izitoast'


class Login extends React.Component{
	state={
		showUserForm: false,
		username: '',
		password: ''
	}

	toggleNewAccountForm = () => {
		this.setState({
			showUserForm: !this.state.showUserForm,
		})
	}

	onFormChange(event){
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		if (this.state.username === '' || this.state.password === '') {
			const username = this.state.username === '' ? "Username" : null
			const password = this.state.password === '' ? "Password" : null

			const messageContent = username && password 
				? `${username} and ${password} are both required`
				: username && !password
					? `${username} is required`
					: `${password} is required`

			iziToast.warning({
				title: "Whoops",
			    message: `${messageContent}`,
			    timeout: 10000,
			    resetOnHover: true,
			    transitionIn: 'fadeInDown',
			    transitionOut: 'fadeOutUp',
			    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
			})
		} else {
			const userFormData = {
				username: this.state.username,
				password: this.state.password
			}
			this.props.processLoginForm(userFormData)
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
								onSubmit={ event => this.onFormSubmit(event) } >
								<Form.Group widths='equal'>
									<Form.Input 
										fluid 
										name="username" 
										label="Username"
										placeholder="dc_foodie"
									/>
									<Form.Input 
										fluid 
										type="password"
										name="password" 
										label="Password"
										placeholder="password123"
									/>
								</Form.Group>
								<div className="login-btn-container"> 
								    <Button type="submit" primary >
								    		Let's Eat!
								    </Button>
								    <p className="sign-up-link"><a onClick={ this.toggleNewAccountForm }>Don't have an account?</a></p>
							    </div>
							</Form>
							{ this.state.showUserForm 
								? <UserForm 
									openModal={ this.state.showUserForm } 
									closeModal={ this.toggleNewAccountForm }
									newAccount
								/>
								: null
							}
							<ContactUs />
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
	// processNewUserForm: (user) => { dispatch(processNewUserForm(user)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)