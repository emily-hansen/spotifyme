import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Loader component
export default function CircleLoader() {
	return (
		<Box sx={{ display: "flex" }}>
			<CircularProgress
				size={20}
				sx={{
					color: "white",
					position: "absolute",
					top: "50%",
					left: "50%",
					marginTop: "-12px",
					marginLeft: "-12px",
				}}
			/>
		</Box>
	);
}
