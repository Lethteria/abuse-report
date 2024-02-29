function ValidateReport(values){
    const errors = {};
    const email = values.email.trim();
    const abusedURL = values.abusedURL.trim();

    if (!abusedURL) {
        errors.abusedURL = 'Required';
    } else {
        try {
            const url = new URL(abusedURL)
        } catch (e) {
            errors.abusedURL = "Invalid URL";
        }
    }//if (!/^(https?:\/\/)?([0-9a-z\.-]+)[^-]\.([a-z]{2,9}\.?)(\/[^\/\?]+)*\?/i.test(abusedURL)) {
        //errors.abusedURL = "Invalid URL";
    //}

    if (!email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "Invalid email address";
    }
    return errors;
}

export {ValidateReport}

