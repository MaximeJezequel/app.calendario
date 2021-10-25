const SideBarEvent = ({ event, formatDate, deleteEvent }) => {
	return (
		<li key={event.id} onClick={() => deleteEvent(event.id)}>
			<b>
				{formatDate(event.start, {
					year: "numeric",
					month: "short",
					day: "numeric",
				})}
			</b>
			<i>{event.title}</i>
		</li>
	)
}

export default SideBarEvent
