function getFullDay(pickedDate) {
	return pickedDate
		? new Date(pickedDate).toISOString().replace(/T.*$/, "")
		: new Date().toISOString().replace(/T.*$/, "")
}

export default getFullDay
