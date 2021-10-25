import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"

import FullCalendar, { formatDate } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

import Modal from "./use/Modal"
import useModal from "./use/useModal"

import SideBar from "./components/SideBar"
// import HeaderToolBar from "./components/HeaderToolBar"
import getFullDay from "./utils/Date"

import "./App.css"

function App() {
	/* Modal */
	const { isShowing, toggle } = useModal()
	/* States */
	const [weekendsVisible, setWeekendsVisible] = useState(true)
	const [currentEvents, setCurrentEvents] = useState([])
	const [refresh, setRefresh] = useState(false)
	const [targetDate, setTargetDate] = useState(getFullDay())
	const [targetEvent, setTargetEvent] = useState({})
	const [targetEventId, setTargetEventId] = useState("")
	// const [currentView, setCurrentView] = useState("dayGridMonth")
	// const [activeDay, setActiveDay] = useState(getFullDay())

	/* -------------------- API REST -------------------- */
	// Get all events
	useEffect(() => {
		const getEvents = async () => {
			const results = await axios.get(`${process.env.REACT_APP_URL_API}/events`)
			setCurrentEvents(results.data)
		}
		getEvents()
	}, [refresh])

	// Get event from targetEventId
	//...

	// setAdminInput((state) => ({ ...state, ["title"]: text }), [])
	useEffect(() => {
		console.log("update_event", targetEventId)
		if (targetEventId) {
			setTargetEvent("")
			const getEventById = () => {
				axios
					.get(`${process.env.REACT_APP_URL_API}/events/${targetEventId}`)
					.then((results) => setTargetEvent(results.data))
			}
			getEventById()
		}
	}, [targetEventId])

	// CREATE a new event
	const postEvent = async (e) => {
		let title = prompt("Please enter a new title for your event")
		let start = e.start
		const newPost = {
			title: title,
			start: start,
			end: start,
			allDay: true,
		}
		try {
			if (title) {
				const res = await axios.post(
					`${process.env.REACT_APP_URL_API}/events`,
					newPost
				)
				setRefresh(!refresh)
				console.log("res post", res)
			}
		} catch (err) {
			console.log("logErrPost", err.response)
		}
	}

	// UPDATE an event
	const updateEvent = async () => {
		let isAllDay = targetEvent.start === targetEvent.end ? true : false
		const newPut = {
			...targetEvent,
			["allDay"]: isAllDay,
		}

		try {
			if (targetEvent.title) {
				const res = await axios.put(
					`${process.env.REACT_APP_URL_API}/events/${targetEventId}`,
					newPut
				)
				console.log("res update", res)
				setRefresh(!refresh)
			}
		} catch (error) {
			console.log("logErrUpdate", error.response)
		}
		toggle()
	}

	// DELETE an event
	const deleteEvent = (idToDelete) => {
		const confirmation = window.confirm(
			`Do you want to delete event ${idToDelete} ?`
		)
		if (confirmation) {
			const DeleteData = async () => {
				await axios
					.delete(`${process.env.REACT_APP_URL_API}/events/${idToDelete}`)
					.then((resToBack) => {
						console.log("res delete", resToBack)
						setRefresh(!refresh)
					})
					.catch((error) => {
						if (error) {
							console.log("logErrDelete", error.response)
						}
					})
			}
			DeleteData()
		}
	}

	/* -------------------- HANDLE EVENTS -------------------- */
	const handleDateSelect = (selectedDate) => {
		setTargetDate(
			getFullDay(
				selectedDate.view.calendar.currentDataManager.data.dateSelection.range
					.start
			)
		)
		if (selectedDate.startStr === targetDate) {
			postEvent(selectedDate)
		}
		// selectedDate.view.calendar.changeView("timeGridDay", selectedDate.start)
		// console.log(calendarApi.view)
	}
	const handleEventClick = (selectedEvent) => {
		toggle()
		setTargetEventId(selectedEvent.event.id) // triggers useEffect
	}

	const onChangeHandler = useCallback(({ target: { name, value } }) =>
		setTargetEvent((state) => ({ ...state, [name]: value }), [])
	)

	/* -------------------- REACT RENDER -------------------- */

	return (
		<div className="App">
			<SideBar
				className="App-sidebar"
				weekendsVisible={weekendsVisible}
				setWeekendsVisible={setWeekendsVisible}
				currentEvents={currentEvents}
				formatDate={formatDate}
				deleteEvent={deleteEvent}
			/>
			<div className="App-main">
				<Modal
					isShowing={isShowing}
					hide={toggle}
					targetEvent={targetEvent}
					onChangeHandler={onChangeHandler}
					updateEvent={updateEvent}
				/>
				{/* <HeaderToolBar /> */}
				<FullCalendar
					// headerToolbar={false}
					// customButtons={{
					// 	myCustomButton: {
					// 		text: "custom",
					// 		click: function () {
					// 			alert("clicked the custom button!")
					// 		},
					// 	},
					// }}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay",
					}}
					initialView="dayGridMonth"
					editable={true}
					nowIndicator={true}
					selectable={true}
					selectMirror={true}
					dayMaxEvents={true}
					weekends={weekendsVisible}
					events={currentEvents} // alternatively, use the `events` setting to fetch from a feed
					select={(e) => handleDateSelect(e)}
					eventClick={(e) => handleEventClick(e)}
					// eventContent={renderEventContent} // custom render function
					// eventsSet={(e) => console.log(e)} // called after events are initialized/added/changed/removed
				/>
			</div>
		</div>
	)
}

export default App
