const START_SWYPE = "START_SWYPE"

function begin(){
	console.log("Let's hunger swype")
  return {type: START_SWYPE, payload: "in-out"}
}


export { begin }