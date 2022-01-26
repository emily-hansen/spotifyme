import React from "react";
import { spotifyGreen } from "./Button";

export default function Background(props) {
	return (
		<div
			style={Object.assign(
				{},
				{
					background: `linear-gradient(${spotifyGreen}, #000)`,
					height: "100vh",
				},
				props.style
			)}>
			{props.children}
		</div>
	);
}
