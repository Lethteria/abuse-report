import {useCallback, useState} from "react";

import {useFormik} from "formik";
import {validateReport} from "./validateAbuseReportForm.js";

import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {reCAPTCHA_action} from "../../constants/constants.js";

import {useSendReportMutation} from "../../services/abuseReportService.js";
import {setReportData} from "./setReportData.js";

import {Button, TextField} from "@mui/material";
import ReportTypesRadioGroup from "../ReportTypesRadioGroup/ReportTypesRadioGroup.jsx";
import CountriesListSelect from "../CountriesListSelect/CountriesListSelect.jsx";
import SubmitModal from "../SubmitModal/SubmitModal.jsx";
import Preloader from "../Preloader/Preloader.jsx";

import styles from "./AbuseReportForm.module.scss";


function AbuseReportForm(){

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

    const validate = validateReport;

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
        onSubmit: async  (values, {resetForm}) => {
            let reportData = await setReportData(values,countryValue, handleReCaptchaVerify);
            console.log(reportData);
            sendReport(reportData)
                .unwrap()
                .then((response) => {
                    console.log(response)
                    setOpenModal(true);
                    resetForm();
                })
                .catch((error) => setOpenModal(true))
            //if (response?.error?.status === 403 ) console.log("status: " + response?.error?.status);
        },
    });

    return (
        <>
        <form onSubmit={formik.handleSubmit} className={styles.wrap}>
            <TextField
                className={styles.required}
                variant="standard"
                fullWidth
                margin="normal"
                required
                id="url"
                name="abusedURL"
                label="Abused URL"
                value={formik.values.abusedURL}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.abusedURL && Boolean(formik.errors.abusedURL)}
                helperText={formik.touched.abusedURL && formik.errors.abusedURL}
            />

            <TextField
                className={styles.required}
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
                    multiline
                    rows={2}
                    id="spamProof"
                    name="spamProof"
                    label="Spam proof"
                    value={formik.values.spamProof}
                    onChange={formik.handleChange}
                />
            }

            <Button className={styles.button} color="primary" variant="contained" fullWidth type="submit">
                Submit
            </Button>

        </form>

        {isLoading && <Preloader />}

        <SubmitModal open={openModal} onClose={handleClose}
                     isError={isError} error={error}/>
        </>
    )
}

export default AbuseReportForm;







