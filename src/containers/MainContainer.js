import React from 'react'
import MenuBar from '../components/MenuBar'
import BeginPage from '../components/BeginPage'

class MainContainer extends React.Component {

	render(){
		return(
			<React.Fragment>
				<MenuBar />
				<BeginPage />
			</React.Fragment>
		)
	}
}

export default MainContainer