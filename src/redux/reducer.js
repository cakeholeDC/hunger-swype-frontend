import {combineReducers} from 'redux'

const sampleUserObj = {
	username: "cakehole",
	preferences: {
		diets: ["vegan"]
	} 
}

function userReducer(oldState = sampleUserObj, action) {
	return oldState
}

function progressReducer(oldState='null', action){
	switch (action.type){
		case 'PROGRESS':
			return action.payload
		default:
			return oldState
	}
}

function dishReducer(oldState = [], action){
	return oldState
}


function dietReducer(oldState=[], action){
	switch (action.type){
		case "FETCHED_DIETS":
			return action.payload
		default:
			return oldState
	}
}
function cuisinesReducer(oldState=[], action){
	switch (action.type){
		case "FETCHED_CUISINES":
			return action.payload
		default:
			return oldState
	}
}
function coursesReducer(oldState=[], action){
	switch (action.type){
		case "FETCHED_COURSES":
			return action.payload
		default:
			return oldState
	}
}

function filterReducer(oldState = {}, action){
	return oldState
}



const rootReducer = combineReducers({
	currentUser: userReducer,
	progress: progressReducer,
	dishes: dishReducer,
	diets: dietReducer,
	cuisines: cuisinesReducer,
	courses: coursesReducer,
	filters: filterReducer
})

export default rootReducer