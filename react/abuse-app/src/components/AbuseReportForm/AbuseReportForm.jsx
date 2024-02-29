import {Button, TextField} from "@mui/material";
import ReportTypesRadioGroup from "../ReportTypesRadioGroup/ReportTypesRadioGroup.jsx";
import CountriesListSelect from "../CountriesListSelect/CountriesListSelect.jsx";
import {useFormik} from "formik";
import {ValidateReport} from "./validateAbuseReportForm.js";
import {useCallback, useState} from "react";

import {reCAPTCHA_action} from "../../app/constants.js";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {sendReport} from "../../app/AbuseAPI.js";
import {useSendReportMutation} from "../../services/AbuseReportService.js";
import {getClientToken} from "../../services/clientTokenServise.js";


export default function AbuseReportForm(){

    const [sendReport, {isLoading, isError, error}] = useSendReportMutation();
    //console.log(mutationObj);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        return  await executeRecaptcha(reCAPTCHA_action);

    }, [executeRecaptcha]);

    const validate = ValidateReport;

    const [countryValue, setCountryValue] = useState(null);
    const onChange = (e, newValue) => setCountryValue(newValue);

    const formik = useFormik({
        initialValues: {
            abusedURL: "",
            email: "",
            reportType: "",
            spamProof: ""
        },
        validate,
        onSubmit: values => {
            //!!!!!!To trim() all values exept reportType
            const targetCountry = countryValue ? countryValue.code : "";
            const clientToken = getClientToken();
            handleReCaptchaVerify()
                .then( captchaToken => {
                    const reportData= {...values, targetCountry, captchaToken, clientToken}
                    console.log(reportData);
                    //sendReport()
                    return sendReport(reportData);
                }).then(response => {
                    //console.log(mutationObj);
                    console.log(response);
                })
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                variant="standard"
                fullWidth
                margin="normal"
                required
                id="url"
                name="abusedURL"
                label="abused URL"
                value={formik.values.abusedURL}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.abusedURL && Boolean(formik.errors.abusedURL)}
                helperText={formik.touched.abusedURL && formik.errors.abusedURL}
            />

            <TextField
                variant="standard"
                fullWidth
                margin="normal"
                required
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <ReportTypesRadioGroup value={formik.values.reportType} handleChange={formik.handleChange}/>

            {formik.values.reportType === "gambling" &&

                <CountriesListSelect value={countryValue} handleChange={onChange}/>
            }

            {formik.values.reportType === "spam" &&
                <TextField
                    variant="standard"
                    fullWidth
                    margin="normal"
                    id="spamProof"
                    name="spamProof"
                    label="Spam Proof"
                    value={formik.values.spamProof}
                    onChange={formik.handleChange}
                />
            }

            {isError && <p>Loading error. Error status:  {error.status} Error text:  {error.error}</p>}

            <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
            </Button>

        </form>
    )
}





