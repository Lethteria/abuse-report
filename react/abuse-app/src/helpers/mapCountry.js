import {countries} from "../countriesList.js";

function mapCountry(countryCode){
    const country = countries.filter(country => countryCode === country.code)
    return country.length ? country[0].label : ""
}

export {mapCountry}