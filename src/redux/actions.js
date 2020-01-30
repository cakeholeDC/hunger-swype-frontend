// const START_SWYPE = "START_SWYPE"
// const FILTER = "FILTER"
const PROGRESS = "PROGRESS"
// const FETCHED_DIETS = "FETCHED_DIETS"
// const FETCHED_CUISINES = "FETCHED_CUISINES"
// const FETCHED_COURSES = "FETCHED_COURSES"

function home(){
	return { type: PROGRESS, payload: null}
}

function begin(){
	console.log("Let's hunger swype")
  return {type: PROGRESS, payload: "in-out"}
}

function filter(){
  return {type: PROGRESS, payload: "filter"}
}

export { begin, filter, home }