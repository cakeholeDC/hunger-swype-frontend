import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer.js'
import Match from './components/Match.js'
import Recipe from './components/Recipe.js'
import { Route, Switch, Redirect } from "react-router-dom";
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
          <Route exact path="/match" render={ (props) => this.props.progress === "match" || this.props.progress === "results" 
              ? <Match />
              : <Redirect to='/' />
          }/>
          <Route path="/match/recipe/:id" component={Recipe}/>
          <Route path="/" component={ MainContainer } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    progress: state.progress,
    currentUser: state.currentUser,
    dishes: state.dishes
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchingDiets: () => { dispatch(fetchingDiets()) } ,
  fetchingCuisines: () => { dispatch(fetchingCuisines()) } ,
  fetchingCourses: () => { dispatch(fetchingCourses()) } ,
  // fetchedDiets: (diets_array) => { dispatch(fetchedDiets(diets_array)) },
  // fetchedCuisines: (cuisines_array) => { dispatch(fetchedCuisines(cuisines_array)) },
  // fetchedCourses: (courses_array) => { dispatch(fetchedCourses(courses_array)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
