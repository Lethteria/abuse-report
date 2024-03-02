import {useGetReportsListQuery} from "../services/abuseReportService.js"
import {getClientToken} from "../services/clientTokenServise.js";

import {Typography} from "@mui/material";
import ReportsListBlock from "../components/ReportsListBlock/ReportsListBlock.jsx";
import Preloader from "../components/Preloader/Preloader.jsx";

function AbuseList(){

    const {data, error, isLoading} = useGetReportsListQuery(getClientToken());

    if (isLoading) {
        return <Preloader />
    }

    if (data) {
        return (
            <>
                <Typography variant="h5" align="center"> Abuse reports list </Typography>
                <ReportsListBlock />
            </>
        )
    }

    if (error) {
        return (
            <>
                <Typography variant="h5">Loading Error</Typography>
                <p>Error status: {error.status} Error text: {(error?.data) ? error.data.error : error.error}</p>
            </>
        )
    }
}

export default AbuseList;

