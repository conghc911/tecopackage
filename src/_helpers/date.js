function timeConverter(UNIX_timestamp) {
    var d = new Date(UNIX_timestamp), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }
    time = dd + '-' + mm + '-' + yyyy + ' ' + h + ':' + min + ' ' + ampm;
    return time;
}

function dateConverter(date){
    var time = new Date(date).getTime();
    var timeConvert = timeConverter(time);
    return timeConvert;
}

module.exports = {
    timeConverter,dateConverter

}