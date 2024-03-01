import {Container, Paper} from "@mui/material";
import styles from "./pageWrap.module.scss";

export default function PageWrap({children}){
    return (
        <Container maxWidth="md">
            <div className={styles.wrap}>
                <Paper elevation={3} >
                    <div className={styles.content}>
                        {children}
                    </div>
                </Paper>
            </div>
        </Container>
    )
}