import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {reportTypesData} from "./data.js";
import styles from "./ReportTypesRadioGroup.module.scss";

export default function ReportTypesRadioGroup({value, handleChange}){

    return (
        <FormControl fullWidth margin="normal">
            <FormLabel id="demo-radio-buttons-group-label">Report type </FormLabel>
            <RadioGroup
                aria-labelledby="report-types-label"
                value={value}
                onChange={handleChange}
                name="reportType"
                row
            >
                {reportTypesData.map(reportType => (
                    <FormControlLabel
                        key={reportType.value}
                        value={reportType.value}
                        control={<Radio />}
                        label={reportType.label}
                        className={styles.radiobutton}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}