import React from "react";
import GeneralPage from "./GeneralPage";
import { DataGrid } from "@mui/x-data-grid";



const columns = [
	{
	  field: 'songTitle',
	  headerName: 'Title',
	  width: 400,
	  editable: true,
	},
	{
	  field: 'artist',
	  headerName: 'Artist',
	  width: 150,
	  editable: true,
	},
	{
	  field: 'Album',
	  headerName: 'Album',
	  width: 150,
	  editable: true,
	},
	{
	  field: 'time',
	  headerName: 'Time',
	  width: 100,
	},
  ];
  
  const rows = [
	
  ];

export default function PlaylistPage() {
	return (
		<GeneralPage link="/homepage">
			<h1>Playlist Page</h1>

			<div style={{ height: 400, width: '100%' }}>
      			<DataGrid
        			rows={rows}
        			columns={columns}
        			pageSize={9}
        			rowsPerPageOptions={[5]}
        			
      			/>
    </div>
		</GeneralPage>
	);
}
