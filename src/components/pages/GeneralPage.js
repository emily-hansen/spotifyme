import React from "react";
import Header from "../Header";
import Background from "../Background";

export default function GeneralPage(props) {
	return (
		<Background style={props.style}>
			<Header link={props.link} />
			{props.children}
		</Background>
	);
}
