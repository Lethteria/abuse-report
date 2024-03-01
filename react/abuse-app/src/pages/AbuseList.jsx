
import {useGetReportsListQuery} from "../services/AbuseReportService.js"
import {getClientToken} from "../services/clientTokenServise.js";
import {Typography} from "@mui/material";
import ReportsListBlock from "../components/ReportsListBlock/ReportsListBlock.jsx";

function AbuseList(){

    const {data, isError, error, isLoading} = useGetReportsListQuery(getClientToken());

    if (isLoading) {
        return (
            <h1>Loading</h1>
        )
    }

    if (data) {
        return (
            <>
                <Typography variant="h4">Abuse reports list</Typography>
                <ReportsListBlock data={data}/>
            </>
        )
    }

    if (error) {
        return (
            <>
                <h1>Error</h1>
                <p>Error status: {error.status} Error text: {(error?.data) ? error.data.error : error.error}</p>
            </>
        )
    }
}

export default AbuseList

