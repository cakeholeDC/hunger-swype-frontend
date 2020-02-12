import React from 'react'
import { Form, Button, Modal, TextArea } from 'semantic-ui-react'
import { toTitleCase, emailIsValid } from '../utils/Helpers.js'
import iziToast from 'izitoast'

class ContactUs extends React.Component {
	state={
		contactModal: false,
		contactFormValid: true,
		name: '',
		email: '',
		message: ''
	}

	toggleContactModal = () => {
		this.setState({
			contactModal: !this.state.contactModal
		})
	}

	onFormChange(event){
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	onFormSubmit = (event) => {
		if (this.formIsValid()) {
			window.open(`mailto:hungerswype@gmail.com?subject=Hunger Swype Help&body=${this.state.message}`);
			event.target.reset()
			this.toggleContactModal()
		}
	}

	formIsValid = () => {
		let valid = true
		
		let fields = ['name','email','message']
		
		let errors = []
		fields.forEach(field => {

			if (field === "email") {

				if (!emailIsValid(this.state.email)) {
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
				title: "Thanks",
			    message: "We'll be in touch.",
			    timeout: 3000,
			    resetOnHover: false,
			    transitionIn: 'fadeInDown',
			    transitionOut: 'fadeOutUp',
			    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
			})
		}

		return valid
	}


	render(){
		return (
			<div id="contact-us">
				<p onClick={ () => this.toggleContactModal() }>Need Help?</p>
				<Modal
					size="mini"
					open={this.state.contactModal}
					closeOnEscape={true}
		            closeOnDimmerClick={true}
		            onClose={ () => this.toggleContactModal() }
		            closeIcon
				>
			    <Modal.Header>Contact Hunger Swype</Modal.Header>
			    <Modal.Content >
			      <Modal.Description>
			        <Form 
						className="login-form"
						onChange={ (event) => this.onFormChange(event) }
						onSubmit={ this.onFormSubmit } >
			        		<Form.Input 
								name="name" 
								label="Name"
								placeholder="John Doe"
								error={ !this.state.contactFormValid /*&& this.state.contactFormName === '' */
									? {
								      content: 'We need to know who you are...',
								      pointing: 'above',
								    }
									: null
								}
							/>
			        		<Form.Input 
								name="email" 
								label="Email"
								placeholder="jdoe@gmail.com"
								error={ !this.state.contactFormValid && !this.emailIsValid(this.state.email)
									? {
								      content: `Please enter a valid email address.`,
								      pointing: 'above',
								    }
								    : null
								}
							/>
							<Form.Input 
								control={TextArea}
								name="message" 
								label="Message"
								placeholder="So, what's up?"
								error={ !this.state.contactFormValid /*&& this.state.username === '' */
									? {
								      content: 'We need to know who you are...',
								      pointing: 'above',
								    }
									: null
								}
							/>
							<div id="contact-btn-container">
							<Button type="submit" primary >Send Email</Button>
				        	</div>
				        </Form>
				      </Modal.Description>
				    </Modal.Content>
				</Modal>
			</div>
		)
	}
}

export default ContactUs