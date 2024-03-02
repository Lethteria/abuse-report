import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {reCAPTCHA3_site_key} from "../constants/constants.js";

import {Typography} from "@mui/material";
import AbuseReportForm from "../components/AbuseReportForm/AbuseReportForm.jsx";

function AbuseReport(){
    return (
        <GoogleReCaptchaProvider reCaptchaKey={reCAPTCHA3_site_key}>
            <Typography variant="h5" align="center">Form to create abuse report</Typography>
            <AbuseReportForm />
        </GoogleReCaptchaProvider>
    )
}

export default AbuseReport;