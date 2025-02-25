import {useSelector} from "react-redux";
import {hideNotification, notificationSelector} from "../../slices/notificationSlice.ts";
import {useAppDispatch} from "../../utils/store.ts";
import {Alert, Box, LinearProgress, Snackbar, SnackbarCloseReason} from "@mui/material";


export default function Notification() {
    const {open, autoClose, message, severity, progressBar} = useSelector(notificationSelector);
    const dispatch = useAppDispatch();
    const onClose = () => dispatch(hideNotification());
    const handleClose = (_event: React.SyntheticEvent | Event, reason: SnackbarCloseReason | undefined) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoClose}
            onClose={handleClose}
            data-testid={'notification-snackbar'}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        >
            <Box>
                {progressBar && <LinearProgress/>}
                <Alert
                    data-testid='notification.alert'
                    className={`alert-notification-${severity}`}
                    severity={severity}
                    onClose={onClose}
                    variant='filled'
                >
                    <Box data-testid='notification.message' sx={{padding: '0 1rem'}}>
                        {message}
                    </Box>
                </Alert>
            </Box>
        </Snackbar>
    )
}