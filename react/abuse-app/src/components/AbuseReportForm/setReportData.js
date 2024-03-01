import {getClientToken} from "../../services/clientTokenServise.js";

async function setReportData(formicValues, countryValue, getCaptchaToken){

    const arrValues = Object.entries(formicValues).map(([key, value]) => [key, value.trim()]);
    const trimFormicValues = Object.fromEntries(arrValues);

    const targetCountry = countryValue ? countryValue.code : "";
    const clientToken = getClientToken();
    const captchaToken = await getCaptchaToken();
    return {...trimFormicValues, targetCountry, captchaToken, clientToken}
}

export {setReportData}