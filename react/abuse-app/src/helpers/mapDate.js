const showDate = (number) => {
    let fixNumber = number.toString();
    if (fixNumber.length < 2) fixNumber = "0" + fixNumber;

    return fixNumber;
};

const mapDate = (date) => {

    const newDate = new Date(date);

    const day = showDate(newDate.getDate());
    const month = showDate(newDate.getMonth() + 1);
    const year = showDate(newDate.getFullYear());
    const hours = showDate(newDate.getHours());
    const min = showDate(newDate.getMinutes());

    return `${day}.${month}.${year} ${hours}:${min}`;
};

export {mapDate}
