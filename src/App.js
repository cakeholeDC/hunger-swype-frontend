import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import MainContainer from './containers/MainContainer.js'
import Match from './components/Match.js'
import Recipe from './components/Recipe.js'
import Login from './components/Login.js'
import About from './components/About.js'
import Profile from './components/Profile.js'
import SplashScreen from './components/SplashScreen.js'
import PageNotFound from './components/PageNotFound.js'
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchingDiets, fetchingCuisines, fetchingCourses, setCurrentUserState } from './redux/actions'

const BASE_URL = "https://hunger-swype-api.herokuapp.com"
const PROFILE_URL = `${BASE_URL}/profile`

class App extends React.Component {
  state={
    loading: true
  }

  appLoaded = () => {
    this.setState({
      loading: false
    })
  }
  
  componentDidMount(){
    setTimeout( this.appLoaded, 4000);
    this.props.fetchingDiets()
    this.props.fetchingCuisines()
    this.props.fetchingCourses()

    let token = localStorage.getItem("token")

    if (token) {
      fetch(PROFILE_URL, {
        method: "GET",
        headers: {
          "Authentication": token
        }
      })
      .then(res => res.json())
      .then(user => {
        this.props.setCurrentUserState(user)
      })
    } else {
      this.setState({ loading: false })
    }
  }

  render(){
    return (
        <div className="App">
         { this.state.loading 
          ? <SplashScreen/>
          : <Switch>
              <Route exact path="/match" render={ (props) => this.props.progress === "match" || this.props.progress === "results" 
                  ? <Match />
                  : <Redirect to='/' />
              }/>
              <Route exact path="/match/recipe/:id" component={Recipe}/>
              <Route exact path="/login" component={ Login } />
              <Route exact path="/about" component={ About } />
              <Route exact path="/profile" component={ Profile } />
              { !this.props.currentUser 
                  ? <Redirect to='/login' />
                  : <Route exact path="/" component={ MainContainer } />
              }
              <Route component={ PageNotFound } />
            </Switch>
          }
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
  setCurrentUserState: (user) => { dispatch(setCurrentUserState(user)) }
  // fetchedDiets: (diets_array) => { dispatch(fetchedDiets(diets_array)) },
  // fetchedCuisines: (cuisines_array) => { dispatch(fetchedCuisines(cuisines_array)) },
  // fetchedCourses: (courses_array) => { dispatch(fetchedCourses(courses_array)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
