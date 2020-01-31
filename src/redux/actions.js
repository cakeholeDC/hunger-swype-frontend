// const START_SWYPE = "START_SWYPE"
// const FILTER = "FILTER"
const PROGRESS = "PROGRESS"
const FETCHED_DIETS = "FETCHED_DIETS"
const FETCHED_CUISINES = "FETCHED_CUISINES"
const FETCHED_COURSES = "FETCHED_COURSES"

const BASE_URL = "http://localhost:3000"
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
