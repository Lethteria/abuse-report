import {getReportList} from "../app/AbuseAPI.js";
import {useEffect} from "react";
import {reportApi} from "../services/AbuseReportService.js";
import {useGetReportsListQuery} from "../services/AbuseReportService.js"
import {getClientToken} from "../services/clientTokenServise.js";

function AbuseList(){

    useEffect(() => {
        //getReportList();
    }, []);

    const {data, error, isLoading} = useGetReportsListQuery(getClientToken());

    if (isLoading) {
        return (
            <h1>Loading</h1>
        )
    }

    if (data) {
        console.log(data)
        return (
            <h1>AbuseList</h1>
        )
    }

    if (error) {
        console.log(error)
        return (
            <h1>Error</h1>
        )
    }
}

export default AbuseList

