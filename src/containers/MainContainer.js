import React from 'react'
import MenuBar from '../components/MenuBar'
import BeginPage from '../components/BeginPage'
import Filters from '../components/Filters'
import store from '../redux/store'
import { connect } from 'react-redux'


class MainContainer extends React.Component {

	render(){
		switch (store.getState().progress){
			case "in-out":
				return(
					<React.Fragment>
						<MenuBar />
						<div>in-out</div>
					</React.Fragment>
				)
			case "filter":
				return(
					<React.Fragment>
						<MenuBar />
						<Filters />
					</React.Fragment>
				)
			default: 
				return(
					<React.Fragment>
						<MenuBar />
						<BeginPage />
					</React.Fragment>
				)
		}

	}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    progress: state.progress
  }
}

export default connect(mapStateToProps)(MainContainer)