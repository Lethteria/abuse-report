import {getClientToken} from "../services/clientTokenServise.js";


async function sendReport(report){

    const clientToken = getClientToken();
    //const report1 = {...report, clientToken}
    console.log(report)
    try {
        let response = await fetch("https://profile.short.io/tmp/abuse-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({...report, clientToken})
        });
        if (response.ok) {
            //const text = await response.statusText;
            console.log(response.statusText)
        }
    }
    catch (e){
        console.log(e)
    }
}

async function getReportList(){

    const clientToken = getClientToken();

    try {
        let response = await fetch(`https://profile.short.io/tmp/abuse-reports?clientToken=${clientToken}`)
        if (response.ok) {
            let reportList = await response.json();
            console.log(reportList)
        } else console.log(response.status)
    }
    catch (e){
        console.log(e)
    }
}

export {sendReport, getReportList}