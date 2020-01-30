import {combineReducers} from 'redux'

function userReducer(oldState = {username: "cakehole"}, action) {
	return oldState
}

function progressReducer(oldState=null, action){
	// return action.payload ? action.payload : oldState 
	switch (action.type){
		case 'START_SWYPE':
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