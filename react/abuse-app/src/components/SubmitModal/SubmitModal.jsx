import {Alert, AlertTitle, Dialog, IconButton} from "@mui/material";
//import CloseIcon from '@mui/icons-material/Close';
import styles from "./SubmitModal.module.scss";

export default function SubmitModal(props) {
    const { onClose, open, isError, error } = props;

    return (
        <Dialog onClose={onClose} open={open}>

            {isError &&

                <Alert severity="error" className={styles.alert}>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        {/*<CloseIcon />*/}
                    </IconButton>
                    <AlertTitle> Sending Error </AlertTitle>
                    <p> Error status: {error.status} </p>
                    <p> Error text: {(error?.data) ? error.data.error : error.error} </p>
                </Alert>
            }
            {!isError &&
                <Alert severity="success" className={styles.alert}>
                    <AlertTitle> Success! </AlertTitle>
                    <p> Your report was successfully send. </p>
                </Alert>
            }

        </Dialog>
    );
}
