import {mapDate} from "./mapDate.js";
import {mapCountry} from "./mapCountry.js";

function mapResponseData(reportsArr){

    const newReportstArr = reportsArr.map( report => {
        return {
            id: report.id.toString(),
            abusedURL: report.abusedURL,
            email: report.email,
            createdAt: mapDate(report.createdAt),
            reportType: report.reportType,
            spamProof: report.spamProof,
            targetCountry: report.targetCountry.length ? mapCountry(report.targetCountry) : report.targetCountry
         }
    })

    const arrFromObj = newReportstArr.map( item => Object.entries(item).filter( ([key,value]) => !!value.length ) );
    return arrFromObj.map(item => Object.fromEntries(item))
}

export {mapResponseData}