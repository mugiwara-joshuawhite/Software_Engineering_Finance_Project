/**
 * fills the income section with the streams from user account
 */
function loadIncome() {

    //Values
    const streams = account.streams;    //Data to show
    const incomeList = document.querySelector(".income-list");  //Where to show the data

    //Loop through streams
    for (let i = 0; i < streams.length; i++) {

        //Main parts of a stream, the name and the data
        let category = document.createElement('button');
        let list = document.createElement('ul');

        let items = [document.createElement('li'),  //Amount
            document.createElement('li'),           //Next due date
            document.createElement('li'),           //End date
        ];
        //Data holds the actual values of each item
        let data = [document.createElement('span'),
            document.createElement('span'),
            document.createElement('span'),
        ];

        //Recurrance data
            /*If this stream recurs
        if (streams[i].recurrance.length == 3) {
            items.push([document.createElement('li'),
                document.createElement('li'),
                document.createElement('li')
            ]);
            data.push([document.createElement('span'),
                document.createElement('span'),
                document.createElement('span')
            ]);
        }
        */

        //Fill out category
        category.innerHTML = streams[i].text;
        category.classList.add("finance-category");
        //TODO: add event listener to expand stream on category

        items[0].innerHTML = "Amount: $";
        items[1].innerHTML = "Next Payday: ";
        items[2].innerHTML = "Goes until: ";
        
        //TODO: Format dates better
        data[0].innerHTML = addCommasToInt(streams[i].amount);
        data[1].innerHTML = prettyDate(new Date(streams[i].date));
        data[2].innerHTML = prettyDate(new Date(streams[i].endDate));
        
        //If there were a way to know how many values an object had i would do this differently
        for (let j = 0; j < 3; j++) {
            data[j].classList.add('income-text');
            items[j].appendChild(data[j]);
            list.appendChild(items[j]);
        }

        incomeList.appendChild(category);
        incomeList.appendChild(list);
    }
}

/**
 * 
 * @param {number} num number to convert
 * @description returns the number num as a string with proper
 * commas (ex: 1000 -> "1,000")
 * sidenote: this function was so much more annoying than i expected lmao
 */
function addCommasToInt(num) {
    
    //Variables
    let strVer = num.toString();    //String version of number
    let returnStr = ""; //Return value (num w/ commas)
    let iterator = 0;   //Keep track of where in string we are
    let isDecimal = false;  //Is num a decimal number?
    let decimals = "";  //The decimal portion of num if isDecimal true

    //Stop running if bad input
    if (isNaN(num)) {
        return "Cannot parse number: Not a number";
    }
    else {
        //Basic testing
            //Is num a decimal?
        if (strVer.includes(".")) {
            decimals = strVer.split(".")[1];
            strVer = strVer.split(".")[0];
            isDecimal = true;
        }
        //https://masteringjs.io/tutorials/fundamentals/trim
        //Trims off leading 0's just in case
        if (strVer[0] == 0 && strVer != "0") {
            strVer = strVer.replace(/^0+/, '');
        }

        //Decides where the first comma would be
        //modulus 3 of the length returns correctly every time
        //unless divisible by 3, in which case it would return 0
        //when the real first comma would be 3
        let firstCommaPos = strVer.length % 3;
        if (firstCommaPos == 0 || strVer.length <= 3) {
            firstCommaPos = 3;
        }

        //Loop through string
        for (let i = 0; i < strVer.length; i++) {

            //Add comma if at comma spot
            if (i == firstCommaPos || iterator == 3) {
                returnStr += "," + strVer[i];
                iterator = 1;
            }
            else {
                returnStr += strVer[i];
                iterator++;
            }
        }

        //Append decimals if they are there
        if (isDecimal) {
            returnStr += "." + decimals;
        }

        return returnStr;
    }
}

/**
 * 
 * @param {Date} date 
 * @description: Takes a date object and returns in form:
 * <name of month> <date><th/st/rd> <year>
 */
function prettyDate(date) {

    window.alert(typeof(date));

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

async function main() {
    await account.loadFromStorage();

    loadIncome();
}

main();