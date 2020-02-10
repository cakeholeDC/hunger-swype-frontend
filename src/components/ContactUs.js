import React from 'react'
import { Form, Button, Container, Header, Modal, TextArea } from 'semantic-ui-react'

class ContactUs extends React.Component {
	state={
		contactModal: false,
		contactFormValid: true
	}

	toggleContactModal = () => {
		this.setState({
			contactModal: !this.state.contactModal
		})
	}
	render(){
		return (
			<div id="contact-us">
				<a className="gray-text" onClick={ () => this.toggleContactModal() }>Need Help?</a>
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
						onChange={ () => console.log('contact form changed')/*event => this.onFormChange(event)*/ }
						onSubmit={ () => console.log('contact form submit') /*this.onFormSubmit*/ } >
			        		<Form.Input 
								fluid 
								name="contactForm_name" 
								label="Username"
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
								fluid
								name="contactForm_emai" 
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
								fluid 
								control={TextArea}
								name="contactForm_message" 
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
							<Button type="submit" onClick={ () => console.log("submit contact form") } primary >Send Email</Button>
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