import {Typography} from "@mui/material";
import AbuseReportForm from "../components/AbuseReportForm/AbuseReportForm.jsx";
import {reCAPTCHA_site_key} from "../constants/constants.js";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

function AbuseReport(){
    return (
        <GoogleReCaptchaProvider reCaptchaKey={reCAPTCHA_site_key}>
            <Typography variant="h4">Form to create abuse Report</Typography>
            <AbuseReportForm />
        </GoogleReCaptchaProvider>
    )
}

export default AbuseReport