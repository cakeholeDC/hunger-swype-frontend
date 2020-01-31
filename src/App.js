import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer.js'
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchingDiets, fetchingCuisines, fetchingCourses } from './redux/actions'



class App extends React.Component {
  
  componentDidMount(){
    this.props.fetchingDiets()
    this.props.fetchingCuisines()
    this.props.fetchingCourses()
  }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={ MainContainer } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchingDiets: () => { dispatch(fetchingDiets())} ,
  fetchingCuisines: () => { dispatch(fetchingCuisines())} ,
  fetchingCourses: () => { dispatch(fetchingCourses())} ,
  // fetchedDiets: (diets_array) => { dispatch(fetchedDiets(diets_array)) },
  // fetchedCuisines: (cuisines_array) => { dispatch(fetchedCuisines(cuisines_array)) },
  // fetchedCourses: (courses_array) => { dispatch(fetchedCourses(courses_array)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
