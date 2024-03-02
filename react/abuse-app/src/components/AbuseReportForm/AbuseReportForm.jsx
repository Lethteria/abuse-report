import {useCallback, useRef, useState} from "react";

import {useFormik} from "formik";
import {validateReport} from "./validateAbuseReportForm.js";

import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {reCAPTCHA2_site_key, reCAPTCHA3_action} from "../../constants/constants.js";
import ReCAPTCHA from "react-google-recaptcha";

import {useSendReportMutation} from "../../services/abuseReportService.js";
import {setReportData} from "./setReportData.js";

import {Button, TextField, Typography} from "@mui/material";
import ReportTypesRadioGroup from "../ReportTypesRadioGroup/ReportTypesRadioGroup.jsx";
import CountriesListSelect from "../CountriesListSelect/CountriesListSelect.jsx";
import SubmitModal from "../SubmitModal/SubmitModal.jsx";
import Preloader from "../Preloader/Preloader.jsx";

import styles from "./AbuseReportForm.module.scss";


function AbuseReportForm(){

    const [openModal, setOpenModal] = useState(false);

    function onCloseModal(){
        setOpenModal(false);
    }

    const [sendReport, {isLoading, isError, error}] = useSendReportMutation();

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) return;

        return  await executeRecaptcha(reCAPTCHA3_action);
    }, [executeRecaptcha]);

    const recaptcha2Ref = useRef();
    const [recaptcha2, setRecaptcha2] = useState(false);
    const [invalidRecaptcha2, setInvalidRecaptcha2] = useState(false);
    function onChangeRecapcha2(){
        setInvalidRecaptcha2(prevState => !prevState);
    }

    const validate = validateReport;

    const [countryValue, setCountryValue] = useState(null);

    function onChange(e, newValue){
        setCountryValue(newValue);
    }

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

            if ( recaptcha2 ) {

                const captcha2Token = recaptcha2Ref.current.getValue();
                if (!captcha2Token) {
                    setInvalidRecaptcha2(true);
                    return;
                }
                reportData = {...reportData, captcha2Token}
            }

            sendReport(reportData)
                .unwrap()
                .then((response) => {
                    setOpenModal(true);
                    resetForm();

                    if (recaptcha2) {
                        setRecaptcha2(false);
                        recaptcha2Ref.current.reset();
                    }
                })
                .catch((error) => {

                    if( error?.status === 403 ){
                        setRecaptcha2(true);
                    } else setOpenModal(true);
                })
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

            {recaptcha2 &&
                <>
                    <ReCAPTCHA ref={recaptcha2Ref} sitekey={reCAPTCHA2_site_key} onChange={onChangeRecapcha2}/>
                    {invalidRecaptcha2 && <Typography variant="body2" color="error">Required</Typography>}
                </>
            }


            <Button className={styles.button} color="primary" variant="contained" fullWidth type="submit">
                Submit
            </Button>

        </form>

        {isLoading && <Preloader />}

        <SubmitModal open={openModal} onClose={onCloseModal}
                     isError={isError} error={error}
        />
        </>
    )
}

export default AbuseReportForm;







