import styles from "../ReportsListBlock/ReportsListBlock.module.scss";
import {Typography} from "@mui/material";
import {mapDate} from "../ReportsListBlock/mapDate.js";
import {useGetReportsListQuery} from "../../services/AbuseReportService.js";
import {getClientToken} from "../../services/clientTokenServise.js";

function ReportContent({report}){

    const {abusedURL, email, createdAt, reportType, targetCountry} = report;

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
                {mapDate(createdAt)}
            </p>

            {(reportType || targetCountry)
                ? <p>
                    {reportType &&
                        <>
                            <Typography variant="button" display="inline" color="primary">Report type: </Typography>
                            {reportType}
                        </>
                    }
                    {targetCountry &&
                        <span className={styles.reportCountry}>
                                            <Typography variant="button" display="inline"
                                                        color="primary">Country: </Typography>
                            {targetCountry}
                                        </span>
                    }
                </p>
                : null
            }

        </li>
    )
}

export default ReportContent;