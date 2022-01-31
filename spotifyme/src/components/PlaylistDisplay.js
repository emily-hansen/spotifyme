import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 90 },
  {
    field: 'artistName',
    headerName: 'Artist Name',
    width: 150,
    editable: true,
  },
  {
    field: 'albumName',
    headerName: 'Album Name',
    width: 150,
    editable: true,
  },
];

const rows = [{ id: 1, title: 'Location', artistName: 'Khalid', albumName: 'American Teen' }];

export default function DataGridDemo() {
  return (
    <div background={'#178E41'} style={{ height: 400, width: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
