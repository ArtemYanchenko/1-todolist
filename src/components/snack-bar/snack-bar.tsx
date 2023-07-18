import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SyntheticEvent } from "react";
import { useAppSelector } from "common/hooks/hooks";
import { appActions } from "app/model/app-reducer";
import { useActions } from "common/hooks/useActions";

export const Snackbars = () => {
  const error = useAppSelector((state) => state.app.error);
  const { setError } = useActions(appActions);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setError({ error: null });
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }} variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
