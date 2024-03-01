import {AlertTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close.js";

function AlertContent({title, onCloseModal, children}){
    return (
        <>
            <IconButton
                aria-label="close"
                onClick={onCloseModal}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>

            <AlertTitle> {title} </AlertTitle>

            {children}
        </>
    )
}

export default AlertContent;