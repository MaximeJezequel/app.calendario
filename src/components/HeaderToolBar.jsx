import React from "react"
import { DefaultButton, Dropdown } from "@fluentui/react"
// https://fluentsite.z22.web.core.windows.net/0.59.0/components/dropdown/definition

import "./HeaderToolBar.css"

const HeaderToolBar = () => {
	let calendarMonths = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	let calendarYears = []
	for (
		let years = new Date().getFullYear() - 10;
		years < new Date().getFullYear() + 2;
		years++
	) {
		calendarYears.push(years)
	}

	let viewButtons = ["month", "week", "day"]

	return (
		<div className="fluentUI">
			<div>ToolBar FluentUI (Experiment in progress)</div>
			{/* <select className="calendarMonth">
				{calendarMonths.map((month, index) => (
					<option key={index} value={month}>
						{month}
					</option>
				))}
			</select>
			<select className="calendarYear">
				{calendarYears.reverse().map((year, index) => (
					<option key={index} value={index + 1}>
						{year + 1}
					</option>
				))}
			</select> */}
			<div className="calendarMonth">
				<Dropdown
					placeholder="Month"
					options={[
						{ text: "January" },
						{ text: "February" },
						{ text: "March" },
						{ text: "April" },
						{ text: "May" },
						{ text: "June" },
						{ text: "July" },
						{ text: "August" },
						{ text: "September" },
						{ text: "October" },
						{ text: "November" },
						{ text: "December" },
					]}
				/>
			</div>
			<div className="calendarYear">
				<Dropdown
					placeholder="Year"
					options={[
						{ text: new Date().getFullYear() },
						{ text: new Date().getFullYear() + 1 },
						{ text: new Date().getFullYear() + 2 },
					]}
				/>
			</div>
			<div className="btn">
				{viewButtons.map((viewBtn, index) => (
					<DefaultButton key={index} text={viewBtn} />
				))}
			</div>
		</div>
	)
}

export default HeaderToolBar
