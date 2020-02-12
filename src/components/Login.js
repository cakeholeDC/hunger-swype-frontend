import React from 'react'
import MenuBar from './MenuBar'
import ContactUs from './ContactUs'
import UserForm from './UserForm.js'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
import { processLoginForm } from '../redux/actions'
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
			    timeout: 5000,
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
								    <p className="sign-up-link" onClick={ this.toggleNewAccountForm }>Don't have an account?</p>
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
						<p id="about-page-link" href="#" onClick={ () => this.props.history.push(`/about`) }>I'm new here, how's this work?</p>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)