import styles from "./ReportsListBlock.module.scss"
import ReportContent from "../ReportContent/ReportContent.jsx";
import {useGetReportsListQuery} from "../../services/AbuseReportService.js";
import {getClientToken} from "../../services/clientTokenServise.js";
import {Pagination, Typography} from "@mui/material";
import {useState} from "react";

function ReportsListBlock(){

    const {data} = useGetReportsListQuery(getClientToken());
    const limit = 4;
    const totalReports = data.length;

    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(totalReports/limit);
    const [displayIndex, setDisplayIndex] = useState({ start: 0, end: limit });

    const handleChange = (event, page) => {
        setPage(page);
        setDisplayIndex({
            start: (page - 1) * limit,
            end: page * limit,
        });
    };

    const reportsListDisplay = (startIndex, endIndex) => {
        const end = endIndex < totalReports ? endIndex : totalReports;
        const reports = [];

        for (let i = startIndex; i < end; i++){
            reports.push(<ReportContent key={data[i].id} report={data[i]}/>)
        }
        return reports;
    }

    if (!data.length) {
        return <Typography variant="h6" align="center" marginBlock={10}> Your have not send any report yet</Typography>
    }

    return (
        <>
            <ul className={styles.wrap}>
                {reportsListDisplay(displayIndex.start,displayIndex.end)}
            </ul>

            <Pagination count={totalPages}
                        page={page}
                        onChange={handleChange}
                        siblingCount={0}
                        shape="rounded"
                        color="primary"
            />
        </>

    )
}

export default ReportsListBlock;
