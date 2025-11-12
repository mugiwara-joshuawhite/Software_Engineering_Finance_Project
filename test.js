/**
 * 
 * @param {Date} date 
 * @description: Takes a date object and returns in form:
 * <name of month> <date><th/st/rd> <year>
 */
function prettyDate(date) {

    let months = ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let day = date.getDate();
    let suffix = "";
    switch (day) {
        case 1: 
            suffix = "st";
            break;
        case 2:
            suffix = "nd";
            break;
        case 3:
            suffix = "rd";
            break;
        default:
            suffix = "th";
            break;
    }

    let pretty = months[date.getMonth()] + " " + day + suffix + " " + date.getFullYear();
    return pretty;
}

console.log(prettyDate(new Date("2001-9-11")));