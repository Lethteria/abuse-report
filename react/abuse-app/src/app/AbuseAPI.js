function createClientToken(){
    const someClientToken = "clientToken";
    localStorage.setItem("clientToken",someClientToken)
}

async function sendReport(report){

    const clientToken = localStorage.getItem("clientToken")
    const report1 = {...report, clientToken}
    console.log(report1)
    try {
        let response = await fetch("https://profile.short.io/tmp/abuse-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(report)
        });
        if (response.ok) console.log(response.statusText)
    }
    catch (e){
        console.log(e)
    }
}

async function getReportList(){

    const clientToken = localStorage.getItem("clientToken");

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