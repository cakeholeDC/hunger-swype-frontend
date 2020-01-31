// const START_SWYPE = "START_SWYPE"
// const FILTER = "FILTER"
export const PROGRESS = "PROGRESS"
export const FETCHED_DIETS = "FETCHED_DIETS"
export const FETCHED_CUISINES = "FETCHED_CUISINES"
export const FETCHED_COURSES = "FETCHED_COURSES"
export const MATCHES = "MATCHES"

const BASE_URL = "http://localhost:3000"
const DISHES_URL = `${BASE_URL}/dishes`
const FILTER_DISH_URL = `${BASE_URL}/get-matches`
const DIETS_URL = `${BASE_URL}/diets`
const COURSES_URL = `${BASE_URL}/courses`
const CUISINES_URL = `${BASE_URL}/cuisines` 

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
	return { type: MATCHES, payload: dish_array }
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

export function home(){
	return { type: PROGRESS, payload: null}
}

export function begin(){
	console.log("Let's hunger swype")
  return {type: PROGRESS, payload: "in-out"}
}

export function filter(){
  return {type: PROGRESS, payload: "filter"}
}
