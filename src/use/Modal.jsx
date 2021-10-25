import React from "react"
import ReactDOM from "react-dom"

import "./Modal.css"

const Modal = ({
	isShowing,
	hide,
	targetEvent,
	onChangeHandler,
	updateEvent,
}) =>
	isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className="modal-overlay" />
					<div
						className="modal-wrapper"
						aria-modal
						aria-hidden
						tabIndex={-1}
						role="dialog"
					>
						<div className="modal">
							<div className="modal-header">
								<button
									type="button"
									className="modal-close-button"
									data-dismiss="modal"
									aria-label="Close"
									onClick={hide}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="eventForm">
								<h2>Modify Event</h2>
								<label>Title</label>
								<input
									className="title"
									name="title"
									value={targetEvent && targetEvent.title && targetEvent.title}
									onChange={onChangeHandler}
								></input>
								<label>Start</label>
								<input
									className="start"
									name="start"
									value={targetEvent && targetEvent.start && targetEvent.start}
									onChange={onChangeHandler}
								></input>
								<label>End</label>
								<input
									className="end"
									name="end"
									value={targetEvent && targetEvent.end && targetEvent.end}
									onChange={onChangeHandler}
								></input>
								<button className="button-default" onClick={updateEvent}>
									Modify
								</button>
							</div>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null

export default Modal
