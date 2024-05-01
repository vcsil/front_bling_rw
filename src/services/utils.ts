function formatDataToString(date: Date) {
    return date.toLocaleDateString().split("/").reverse().join("-");
}

export { formatDataToString };
