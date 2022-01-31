import React, { useEffect, useState } from "react";
import Background from "../Background";
import {Collapse, Typography, Paper, Avatar, Stack  } from '@mui/material';
import { ColorButton, spotifyGreen, spotifyGreenDark } from "../Button";
import background_image_test from "../../assets/landingpage_backgroundimage_test.jpg";
import { useNavigate } from "react-router-dom";



export default function HeroPage() { //landing page for spotifyme

	let navigate = useNavigate();
	//placeholder stuff - should bring up sign in page instead
	const routeHome = () =>{ 
		navigate('/HomePage');
	}
	const [checked, setChecked] = useState(false)
	useEffect(()=>{
		setChecked(true);
	},[])

	return ( //Still trying to figure out how to add in a background image properly
		<Background style = {{backgroundImage: background_image_test}}>
			<div 
				class = "navBar"
				style={{
					backgroundColor: "#000",
					height: "60px",
					width: "100vw",
				}}>
				<Stack
					direction="row"
					spacing={2}
					style={{
						float: "right",
						color: "#fff",
						display: "flex",
						alignItems: "center",
						transform: "translate(-10%, 15%)",
					}}>
					<Typography style ={{
						//need to style this
						fontSize: 25,
						alignItems: 'right',
					}}>
						SpotifyMe
					</Typography>
					<ColorButton
						style={{
							textTransform: "capitalize",
							paddingLeft: "20px",
							paddingRight: "20px",
							lineHeight: 1.25,
							fontSize: 14,
						}}
						onClick={routeHome}>
						Sign In <br /> with spotify
					</ColorButton>
				</Stack>
			</div>
			<Collapse 
			in={checked} 
			{...(checked ? {timeout: 1000} : {})}
			collapsedHeight={50}
			>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '40vh',
					fontSize: 40,
					fontFamily: 'Roboto', //testing fonts
					textAlign: 'center',
				}}>
					<h1>
						SpotifyMe <br /> Build Custom Playlists
					</h1>
				</div>
			</Collapse>

		</Background>

    );
}