import {getClientToken} from "../../services/clientTokenServise.js";

async function setReportData(formicValues, countryValue, getCaptchaToken){
    //!!!!!!To trim() all values exept reportType
    const targetCountry = countryValue ? countryValue.code : "";
    const clientToken = getClientToken();
    const captchaToken = await getCaptchaToken();
    return {...formicValues, targetCountry, captchaToken, clientToken}
}

export {setReportData}