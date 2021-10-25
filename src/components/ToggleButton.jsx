const ToggleButton = ({ text, value, handleChange }) => {
	return (
		<label>
			<input
				className="checkbox"
				type="checkbox"
				checked={value}
				onChange={handleChange}
			></input>
			{text}
		</label>
	)
}

export default ToggleButton
