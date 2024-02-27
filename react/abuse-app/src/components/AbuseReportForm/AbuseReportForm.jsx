import {Button, TextField} from "@mui/material";
import ReportTypesRadioGroup from "../ReportTypesRadioGroup/ReportTypesRadioGroup.jsx";
import CountriesListSelect from "../CountriesListSelect/CountriesListSelect.jsx";
import {useFormik} from "formik";
import {ValidateReport} from "./validateAbuseReportForm.js";
import {useState} from "react";

export default function AbuseReportForm(){
    const validate = ValidateReport;

    const [value, setValue] = useState(null);


    const onChange = (e, newValue) => setValue(newValue);


    const formik = useFormik({
        initialValues: {
            clientToken: "clientToken",
            abusedURL: "",
            email: "",
            reportType: "",
            spamProof: "",
            //targetCountry: "",
            captchaToken: ""
        },
        validate,
        onSubmit: values => {
            console.log(values);
            console.log("targetCountry: " + value?.label )
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

                <CountriesListSelect value={value} onChange={onChange}/>
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

            <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
            </Button>
        </form>
    )
}