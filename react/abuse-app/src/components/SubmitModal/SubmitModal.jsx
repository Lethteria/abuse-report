import {Dialog, DialogTitle} from "@mui/material";

export default function SubmitModal(props) {
    const { onClose, open, isError, error } = props;

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Form submit modal</DialogTitle>
            {isError &&
                <p>Error status: {error.status}
                    Error text: {(error?.data) ? error.data.error : error.error}
                </p>
            }
            {!isError && <p>Success!</p>}

        </Dialog>
    );
}
