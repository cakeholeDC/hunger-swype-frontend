export function toTitleCase(string) {
	const words = string.toLowerCase().split(' ')
	return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}