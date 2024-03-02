import styles from "../ReportsListBlock/ReportsListBlock.module.scss";
import {Typography} from "@mui/material";

function ReportContent({report}){

    const {abusedURL, email, createdAt, reportType, targetCountry, spamProof} = report;

    return (
        <li className={styles.reportItem}>

            <p>
                <Typography variant="button" display="inline" color="primary">Url: </Typography>
                {abusedURL}
            </p>
            <p>
                <Typography variant="button" display="inline" color="primary">Email: </Typography>
                {email}
            </p>
            <p>
                <Typography variant="button" display="inline" color="primary">Created at: </Typography>
                {createdAt}
            </p>

            {reportType &&
                <p>
                    <Typography variant="button" display="inline" color="primary">Report type: </Typography>
                    {reportType}
                </p>
            }

            {targetCountry &&
                <p>
                    <Typography variant="button" display="inline" color="primary">Country: </Typography>
                    {targetCountry}
                </p>
            }

            {spamProof &&
                <p>
                    <Typography variant="button" display="inline" color="primary">Spam Proof: </Typography>
                    {spamProof}
                </p>
            }

        </li>
    )
}

export default ReportContent;