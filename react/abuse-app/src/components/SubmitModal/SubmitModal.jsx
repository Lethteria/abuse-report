import {Alert, Dialog} from "@mui/material";
import styles from "./SubmitModal.module.scss";
import AlertContent from "../AlertContent/AlertContent.jsx";

export default function SubmitModal(props) {
    const { onClose, open, isError, error } = props;

    return (
        <Dialog onClose={onClose} open={open}>

            {isError &&
                <Alert severity="error" className={styles.alert}>
                    <AlertContent title="Sending Error" onCloseModal={onClose}>
                        <p> Error status: {error.status} </p>
                        <p> Error text: {(error?.data) ? error.data.error : error.error} </p>
                    </AlertContent>
                </Alert>
            }

            {!isError &&
                <Alert severity="success" className={styles.alert}>
                    <AlertContent title="Success!" onCloseModal={onClose}>
                        <p> Your report was successfully send. </p>
                    </AlertContent>
                </Alert>
            }

        </Dialog>
    );
}
