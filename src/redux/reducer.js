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

function progressReducer(oldState=null, action){
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



const rootReducer = combineReducers({
	currentUser: userReducer,
	progress: progressReducer,
	dishes: dishReducer
})

export default rootReducer