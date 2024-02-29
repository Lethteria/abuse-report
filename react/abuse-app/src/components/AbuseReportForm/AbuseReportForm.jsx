import {Button, TextField} from "@mui/material";
import ReportTypesRadioGroup from "../ReportTypesRadioGroup/ReportTypesRadioGroup.jsx";
import CountriesListSelect from "../CountriesListSelect/CountriesListSelect.jsx";
import {useFormik} from "formik";
import {ValidateReport} from "./validateAbuseReportForm.js";
import {useCallback, useState} from "react";

import {reCAPTCHA_action} from "../../constants/constants.js";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {useSendReportMutation} from "../../services/AbuseReportService.js";
import SubmitModal from "../SubmitModal/SubmitModal.jsx";
import {setReportData} from "./setReportData.js";


export default function AbuseReportForm(){

    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {
        setOpenModal(false);
    };

    const [sendReport, {isLoading, isError, error}] = useSendReportMutation();

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) return;

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
        onSubmit: async  (values) => {
            let reportData = await setReportData(values,countryValue, handleReCaptchaVerify);
            //console.log(reportData);
            sendReport(reportData)
                .unwrap()
                .then((response) => console.log(response))
                .catch((error) => setOpenModal(true))
            //if (response?.error?.status === 403 ) console.log("status: " + response?.error?.status);
        },
    });

    return (
        <>
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

            {isLoading && <p>Sending report...</p>}

            <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
            </Button>

        </form>

        <SubmitModal open={openModal} onClose={handleClose}
                     isError={isError} error={error}/>
        </>
    )
}





