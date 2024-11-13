function formatDataToString(date: Date) {
    return date.toLocaleDateString().split("/").reverse().join("-");
}

function formatDataToStringToUser(date: Date) {
    const dateArray = date.toLocaleDateString().split("/");
    // const day = Number(dateArray[1]) < 10 ? "0" + dateArray[1] : dateArray[1];
    // const month = Number(dateArray[0]) < 10 ? "0" + dateArray[0] : dateArray[0];
    // const dateString = day + "/" + month + "/" + dateArray[2];
    const dateString = dateArray[0] + "/" + dateArray[1] + "/" + dateArray[2];
    return dateString;
}

export { formatDataToString, formatDataToStringToUser };
