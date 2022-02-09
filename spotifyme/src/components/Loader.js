import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircleLoad() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{color:"#1DB954"}} />
    </Box>
  );
}