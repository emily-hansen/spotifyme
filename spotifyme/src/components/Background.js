import React from "react";
import { spotifyGreen } from "./Button";

/**
 * Background component for the pages.
 * @param {object} style - The style of the component
 */
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
