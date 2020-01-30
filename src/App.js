import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer.js'
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'

const BASE_URL = "http://localhost:3000"
const DIETS_URL = `${BASE_URL}/diets`
const COURSES_URL = `${BASE_URL}/courses`
const CUISINES_URL = `${BASE_URL}/cuisines`

class App extends React.Component {
  
  componentDidMount(){
    console.log("App =>", this.props)
    fetch(DIETS_URL)
      .then(res => res.json())
      .then(diets_array => this.props.fetchedDiets(diets_array))
    fetch(CUISINES_URL)
      .then(res => res.json())
      .then(cuisines_array => this.props.fetchedCuisines(cuisines_array))
    fetch(COURSES_URL)
      .then(res => res.json())
      .then(courses_array => this.props.fetchedCourses(courses_array))
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
  fetchedDiets: (diets_array) => { dispatch({ type: "FETCHED_DIETS", payload: diets_array }) },
  fetchedCuisines: (cuisines_array) => { dispatch({ type: "FETCHED_CUISINES", payload: cuisines_array }) },
  fetchedCourses: (courses_array) => { dispatch({ type: "FETCHED_COURSES", payload: courses_array }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
