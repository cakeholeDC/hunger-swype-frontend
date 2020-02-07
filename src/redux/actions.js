// const START_SWYPE = "START_SWYPE"
// const FILTER = "FILTER"
export const PROGRESS = "PROGRESS"
export const FETCHED_DIETS = "FETCHED_DIETS"
export const FETCHED_CUISINES = "FETCHED_CUISINES"
export const FETCHED_COURSES = "FETCHED_COURSES"
export const FETCHED_DISHES = "FETCHED_DISHES"
export const USER_MATCHES = "USER_MATCHES"
export const LOG_IN = "LOG_IN"
export const FAVORITE = "FAVORITE"

const BASE_URL = "http://localhost:3000"
// const DISHES_URL = `${BASE_URL}/dishes`
const FILTER_DISH_URL = `${BASE_URL}/get-matches`
const DIETS_URL = `${BASE_URL}/diets`
const COURSES_URL = `${BASE_URL}/courses`
const CUISINES_URL = `${BASE_URL}/cuisines` 
const USER_URL = `${BASE_URL}/users` 
const API_LOGIN = `${BASE_URL}/api/v1/login` 
const FAVORITES_URL = `${BASE_URL}/favorites` 

export function fetchingDiets(){
	return (dispatch) => {
		fetch(DIETS_URL)
	      .then(res => res.json())
	      .then(diets_array => {
	      	dispatch(fetchedDiets(diets_array))
	      })
	}
}

export function fetchingCuisines(){
	return (dispatch) => {
		fetch(CUISINES_URL)
	      .then(res => res.json())
	      .then(cuisines_array => {
	      	dispatch(fetchedCuisines(cuisines_array))
	      })
	}
}

export function fetchingCourses(){
	return (dispatch) => {
		fetch(COURSES_URL)
	      .then(res => res.json())
	      .then(courses_array => {
	      	dispatch(fetchedCourses(courses_array))
	      })
	}
}

export function fetchingDishes(filters){
	const dishConfig = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"accepts": "application/json"
		},
		body: JSON.stringify(filters)
	}

	return (dispatch) => {
		fetch(FILTER_DISH_URL, dishConfig)
			.then(res => res.json())
			.then(dishArray => {
				dispatch(fetchedDishes(dishArray))
			})
	}
}

export function fetchedDishes(dish_array){
	return { type: FETCHED_DISHES, payload: dish_array }
}

export function fetchedDiets(diets_array){
	return { type: FETCHED_DIETS, payload: diets_array }
}

export function fetchedCuisines(cuisines_array){
	return { type: FETCHED_CUISINES, payload: cuisines_array }
}

export function fetchedCourses(courses_array){
	return { type: FETCHED_COURSES, payload: courses_array }
}

export function returnHome(){
	return { type: PROGRESS, payload: "home"}
}

export function getMatches(){
	return { type: PROGRESS, payload: "match"}
}

export function showUserMatches(matches){
	return { type: USER_MATCHES, payload: matches}
}

export function getResultsPage() {
	return { type: PROGRESS, payload: "results"}
}

export function begin(){
	console.log("Let's hunger swype")
  return {type: PROGRESS, payload: "in-out"}
}

export function proceedToFilters(){
  return {type: PROGRESS, payload: "filter"}
}

export function processLoginForm(user){
	return (dispatch) => {
		const userConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify(user)
		}
		fetch(API_LOGIN, userConfig)
			.then(res => res.json())
			.then(apiResponse => {
				if (!apiResponse.error) {
					console.log(apiResponse.jwt)
					localStorage.setItem("token", apiResponse.jwt)
					dispatch(setCurrentUserState(JSON.parse(apiResponse.currentUser)))
				} else {
					alert(apiResponse.message)
				}
			})
	}
}

export function processNewUserForm(user){
	return (dispatch) => {
			const userConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify(user)
		}
		fetch(USER_URL, userConfig)
			.then(res => res.json())
			.then(apiResponse => {
				if (!apiResponse.error) {
					console.log(apiResponse.jwt)
					localStorage.setItem("token", apiResponse.jwt)
					dispatch(setCurrentUserState(JSON.parse(apiResponse.currentUser)))
				} else {
					alert(apiResponse.message)
				}
			})
	}
}

export function toggleFavorite(userID, recipe){
	return (dispatch) => {
		const fav_config = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify({
				userID: userID,
				recipe: recipe
			})
		}
		fetch(FAVORITES_URL, fav_config)
			.then(res => res.json())
			.then(favoritesList => {
				dispatch(updateFavorites(favoritesList))
			})
	}
}

export function updateFavorites(favoritesList){
	return { type: FAVORITE, payload: favoritesList}
}

export function logOutUser() {
	return (dispatch) => {
		localStorage.removeItem('token')
		dispatch(setCurrentUserState(null))	
	}
}

export function setCurrentUserState(user){
	return {type: LOG_IN, payload: user}
}
