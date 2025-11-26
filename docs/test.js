//Takes a date object and recurrance array and returns boolean
function updateDate(date, recurrance) {
    
    let nextDate = new Date(date);

    weekdays = new Map()
    weekdays.set("Sunday", 0)
    weekdays.set("Monday", 1)
    weekdays.set("Tuesday", 2)
    weekdays.set("Wednesday", 3)
    weekdays.set("Thursday", 4)
    weekdays.set("Friday", 5)
    weekdays.set("Saturday", 6)

    //These are the simple ones, simply adding a certain amount of time to the last date
    if (recurrance[0] == "daily") {
        let days = Number(recurrance[1]);
        nextDate.setDate(date.getDate() + days);
    }
    else if (recurrance[0] == "monthly") {
        let months = Number(recurrance[1]);
        nextDate.setMonth(date.getMonth() + months);
    }
    else if (recurrance[0] == "yearly") {
        let years = Number(recurrance[1]);
        nextDate.setFullYear(date.getFullYear() + years);
    }

    //Specific day - every Xth day of every Yth month
    //Edge cases - X > 28 automatically sets to last day of month
    else if (recurrance[0] == "specificDay") {
        let days = Number(recurrance[1]);
        let months = Number(recurrance[2]);

        //Avoids issues with overflowing of months
        nextDate.setDate(1);

        //If more than the max amount of days of shortest month,
        //interpret as the last day of every month
        if (days > 28) {
            //setMonth is set to one month past desired month
            //This is because when setting date to the 0th of that
            //month, JS reads 0 as the last day of the previous month
            nextDate.setMonth(date.getMonth() + months + 1);
            nextDate.setDate(0);

            console.log("nextDate: " + nextDate);
        }
        else {
            nextDate.setMonth(date.getMonth() + months);
            nextDate.setDate(days);
        }
    }

    //SpecificDayOfWeek - The Xth W of Every Yth month where W is a day of the week
    else if (recurrance[0] == "specificDayOfWeek") {

        let days = Number(recurrance[1]);
        let months = Number(recurrance[2]);
        let dayOfWeek = recurrance[3];

        nextDate.setDate(1) // Go to the first day of the month
        nextDate.setMonth(nextDate.getMonth() + months)
                        
        while (nextDate.getDay() != weekdays.get(dayOfWeek)) {
            nextDate.setDate(nextDate.getDate() + 1)
        }

        for (let i = 1; i < days; i++) {
            nextDate.setDate(nextDate.getDate() + 7)
        }
    }

    return nextDate;
}

date = new Date("2025-11-26T07:00:00.000Z"); 
thisRecur = ["specificDayOfWeek", "2", "2", "Wednesday"];
newDate = updateDate(date, thisRecur);
console.log(newDate);