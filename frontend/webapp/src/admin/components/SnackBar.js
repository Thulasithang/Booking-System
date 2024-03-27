import { Alert, Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";

export default function SnackBar({ open, setOpen, message }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      transitionDuration={{ enter: 500, exit: 500 }}
      TransitionComponent={Slide}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}
