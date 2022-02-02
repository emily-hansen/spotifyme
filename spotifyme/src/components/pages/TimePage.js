import React from "react";
import GeneralPage from "./GeneralPage";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ColorButton} from "../Button";
//temporary item card 
import { Card, styled } from "@mui/material";

export const ItemCard = styled(Card)(() => ({
	backgroundColor: "#000",
	borderRadius: "10px",
	boxShadow: "0px 0px 10px #000",
	padding: "50px",
	color: "#fff", 
	
	width: "50%", 
	margin: "auto",
	marginTop: "10%"
}));


export default function TimePage() {

	const [hours, setHours] = React.useState('');
	const [minutes, setMinutes] = React.useState('');
	const handleChangeH = (event) => {
	  setHours(event.target.value);
	};
	const handleChangeM = (event) => {
		setMinutes(event.target.value);
	  };

	
	return (
		<GeneralPage link="/homepage">


			<ItemCard>
			
					<p
						style={{
							color: "#888", fontSize: "35px", marginBottom: "20px", marginTop: "0px"
						}}>
						{"Make a playlist that runs for a given time based on your recently listened."}
					</p>
				
				<Box>
      			<FormControl sx={{ minWidth: 120, maxWidth: 300}}>
        			<InputLabel>Hours</InputLabel>
        			<Select
          				value={hours}
          				label="Hours"
          				onChange={handleChangeH}
						sx={{backgroundColor: "white"}}
        			>
          				<MenuItem value={0}>0</MenuItem>
						<MenuItem value={1}>1</MenuItem>
          				<MenuItem value={2}>2</MenuItem>
          				<MenuItem value={3}>3</MenuItem>
        			</Select>
      			</FormControl>
    		
      			<FormControl sx={{ minWidth: 120, maxWidth: 300}}>
        			<InputLabel>Minuites</InputLabel>
        			<Select
          				value={minutes}
          				label="Minutes"
          				onChange={handleChangeM}
						sx={{backgroundColor: "white"}}
        			>
						<MenuItem value={0}>0</MenuItem>
          				<MenuItem value={5}>5</MenuItem>
          				<MenuItem value={10}>10</MenuItem>
          				<MenuItem value={15}>15</MenuItem>
						<MenuItem value={20}>20</MenuItem>
          				<MenuItem value={25}>25</MenuItem>
          				<MenuItem value={30}>30</MenuItem>
						<MenuItem value={35}>35</MenuItem>
          				<MenuItem value={40}>40</MenuItem>
          				<MenuItem value={45}>45</MenuItem>
						<MenuItem value={50}>50</MenuItem>
          				<MenuItem value={55}>55</MenuItem>
        			</Select>
      			</FormControl>
    		</Box>

			<ColorButton
				style={{
					marginTop: "20px",
					paddingLeft: "30px",
					paddingRight: "30px",
					fontSize: "20px",
					textTransform: "capitalize",
				}}
				onClick={() => navigator("/homepage")}>
				Create Playlist
			</ColorButton>

			</ItemCard>
		</GeneralPage>
	);
}
