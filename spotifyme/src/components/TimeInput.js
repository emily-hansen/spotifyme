import React from "react";
import TextField from "@mui/material/TextField";

export default function TimeInput(props) {
	return (
		<TextField
			sx={{
				backgroundColor: "white",
				borderRadius: "5px",
			}}
			autoFocus
			value={props.value}
			onChange={(e) => {
				let newValue = e.target.value.replace(/[^0-9]/g, "");

				for (let i = 0; i < newValue.length; i++) {
					if (newValue[i] === "0") {
						newValue = newValue.slice(i + 1);
						i--;
					} else {
						break;
					}
				}

				if (newValue.length === 0) {
					newValue = "HH:MM:SS";
				} else if (newValue.length === 1) {
					newValue = "HHMM0" + newValue;
				} else if (newValue.length === 2) {
					newValue = "HHMM" + newValue;
				} else if (newValue.length === 3) {
					newValue = "HH0" + newValue;
				} else if (newValue.length === 4) {
					newValue = "HH" + newValue;
				} else if (newValue.length === 5) {
					newValue = "0" + newValue;
				} else if (newValue.length > 6) {
					newValue = newValue.slice(0, 6);
				}

				newValue = newValue.replace(/^(\w{2})(\w{2})/, "$1:$2:");
				props.setValue(newValue);
				
				localStorage.setItem('time', newValue);
			}}
		/>
	);
}
