import React from "react"

import { DrinkBeer24Filled } from "@fluentui/react-icons"

import ToggleButton from "./ToggleButton"
import SideBarEvent from "./SideBarEvent"

import "./SideBar.css"

const SideBar = ({
	weekendsVisible,
	setWeekendsVisible,
	currentEvents,
	formatDate,
	deleteEvent,
}) => {
	const handleWeekendsToggle = () => {
		setWeekendsVisible(!weekendsVisible)
	}

	return (
		<div className="App-sidebar">
			<div className="App-sidebar-section">
				<div className="company">
					<DrinkBeer24Filled />
					<h1>BinouzeCorp</h1>
				</div>

				<h2>Welcome to calendario</h2>
				<p>How to manage events of the BinouzeCorp brewery?</p>
				<ul>
					<li>
						Select a date, if you click twice you will be prompted to create a
						new event
					</li>
					<li>Drag, drop, and resize events (no record so far)</li>
					<li>Click an event on the calendar to modify it</li>
					<li>Click an event in the list below to delete it</li>
				</ul>
			</div>
			<div className="App-sidebar-section">
				<ToggleButton
					text="toggle weekends"
					value={weekendsVisible}
					handleChange={handleWeekendsToggle}
				/>
			</div>
			<div className="App-sidebar-section">
				<h2>All events ({currentEvents.length})</h2>
				<ul>
					{currentEvents.map((event) => (
						<SideBarEvent
							key={event.id}
							event={event}
							formatDate={formatDate}
							deleteEvent={deleteEvent}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}

export default SideBar
