import {Container, Paper} from "@mui/material";
import styles from "./pageWrap.module.scss";

export default function PageWrap({children}){
    return (
        <Container maxWidth="md">
            <Paper elevation={3} >
                <div className={styles.wrap}>
                    {children}
                </div>
            </Paper>
        </Container>
    )
}