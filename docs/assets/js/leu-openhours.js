
function is_open(date = null) {
    if (date === null)
        date = new Date();
    let oH = document.openhours.json;

    return oH.some((cur) => {
        if (cur.dayOfWeek !== `${date.getDay()}`)
            return false;
        let from = parseInt(cur.from.replace(":", ""));
        let till = parseInt(cur.till.replace(":", ""));
        let curTs = parseInt(date.getHours()+date.getMinutes());
        if (curTs > from && curTs < till)
            return true;
    })
}

/**
 * Format unix like time
 *
 * Y-m-d H:i:s   => 2022-05-01 15:44:01
 *
 * @param format
 * @param date
 * @returns {*}
 */
function datefmt(format, date=null) {
    if (date === null)
        date = new Date();
    return format
        .replace("Y", date.getFullYear())
        .replace("m", (date.getMonth()+1).toString().padStart(2, '0'))
        .replace("d", date.getDate().toString().padStart(2, '0'))
        .replace("H", date.getHours().toString().padStart(2, '0'))
        .replace("i", date.getMinutes().toString().padStart(2, '0'))
        .replace("s", date.getSeconds().toString().padStart(2, '0'))
}

function get_vacation(date = null) {
    if (date === null)
        date = new Date();
    let vac = document.openhours.vacation;
    for(let cur of vac) {
        if (cur.from === "" || cur.till === "")
            continue;
        console.log(cur.from, cur.till);
        if (cur.from <= datefmt("Y-m-d", date) && datefmt("Y-m-d", date) <= cur.till)
            return cur;
    }
    return null;
}

const MILLI_SECONDS_PER_DAY = 86400 * 1000;

function getMidnightOfDate(date = null, dayOffset=0) {
    if (date === null)
        date = new Date();
    let curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    return new Date(+curDay + (MILLI_SECONDS_PER_DAY * dayOffset));
}

function getPreviousDayOfWeek(dayOfWeek = 0, date = null) {
    if (date === null)
        date = new Date();

    for(let offset = 0; offset > -8; offset--) {
        let cur = getMidnightOfDate(date, offset);
        if (cur.getDay() === dayOfWeek)
            return cur;
    }
}

function getOpenHoursOfDayOfWeek(dayOfWeek, date=null) {
    return oH.filter((cur) => {
        if (cur.dayOfWeek !== `${dayOfWeek}`)
            return false;
        let till = parseInt(cur.till.replace(":", ""));
        if (date === null)
            return true;
        let curTs = parseInt(date.getHours()+""+date.getMinutes());
        return curTs > till;
    })
}




