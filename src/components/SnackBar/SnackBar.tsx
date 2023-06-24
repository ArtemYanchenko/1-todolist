import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { appActions } from "app/app-reducer";

export const Snackbars = () => {
  const error = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setError({ error: null }));
  };
  debugger;
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }} variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
