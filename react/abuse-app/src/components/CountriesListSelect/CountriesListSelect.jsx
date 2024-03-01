import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {countries} from "./data.js"
import {useState} from "react";
import styles from "./CountriesListSelect.module.scss";

export default function CountriesListSelect({value, handleChange}) {

    const [inputValue, setInputValue] = useState("");
    const onInputChange = (e, newInputValue) => setInputValue(newInputValue);


    return (
        <Autocomplete
            className={styles.wrap}
            fullWidth
            id="countrySelect"
            options={countries}
            value={value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={onInputChange}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" {...props}>
                    <img
                        className={styles.flag}
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt={`${option.label} flag`}
                    />
                    {option.label} ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Choose a country"
                />
            )}
        />
    );
}