import {combineReducers} from 'redux'
import { PROGRESS, FETCHED_DIETS, FETCHED_CUISINES, FETCHED_COURSES, FETCHED_DISHES, USER_MATCHES, LOG_IN } from './actions.js'

const sampleUserObj = {
	username: "cakehole",
	preferences: {
		diets: ["vegan"]
	} 
}

function userReducer(oldState = null, action) {
	switch (action.type){
		case LOG_IN:
			return action.payload
		default:
			return oldState
	}
}

function progressReducer(oldState='home', action){
	switch (action.type){
		case PROGRESS:
			return action.payload
		default:
			return oldState
	}
}

function dishReducer(oldState = [], action){
	switch (action.type){
		case FETCHED_DISHES:
			return action.payload
		default:
			return oldState
	}
}

function dietReducer(oldState=[], action){
	switch (action.type){
		case FETCHED_DIETS:
			return action.payload
		default:
			return oldState
	}
}
function cuisinesReducer(oldState=[], action){
	switch (action.type){
		case FETCHED_CUISINES:
			return action.payload
		default:
			return oldState
	}
}
function coursesReducer(oldState=[], action){
	switch (action.type){
		case FETCHED_COURSES:
			return action.payload
		default:
			return oldState
	}
}

// function filterReducer(oldState = {}, action){
// 	return oldState
// }

function matchReducer(oldState = [], action){
	switch (action.type){
		case USER_MATCHES:
			return action.payload
		default:
			return oldState
	}
}



const rootReducer = combineReducers({
	currentUser: userReducer,
	progress: progressReducer,
	dishes: dishReducer,
	diets: dietReducer,
	cuisines: cuisinesReducer,
	courses: coursesReducer,
	matches: matchReducer
})

export default rootReducer