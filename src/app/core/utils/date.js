function formatDate(date) {
    let dateString = date.toLocaleDateString('ru-RU', {
        hourCycle: 'h23',
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).replaceAll(".", "-").replace(",", "")
    let [dateDateString, dateTimeString] = dateString.split(" ")
    dateDateString = dateDateString.split("-").reverse().join("-")

    return `${dateDateString} ${dateTimeString}`
}


export {
    formatDate,
}