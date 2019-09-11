require('../src/tools-for-instagram.js');
let totalLikes = 120;
let initialHour = 15, endHour = 23;

/*  When bot is started every row of '0's is an hour of the day
    so it goes from 00 to 23. 
    Each 0 means the actual minute of the hour row
    Each 1 means a like programmed for that time
    Each 2 means a like that was already done
    The actual minute will be colored as blue
 */

let hashtagArray = [
    "cats",
    "dogs",
    "chameleon",
    "fish",
    "gaming",
    "music"
];

function isArrayFinished(array) {
    let result = true;
    array.forEach( element => {
        
        if (element == 1)
            result = false;
    });
    return result;
}
function arrayInitializer(initialHour, endHour) {
    let dayInMinutes = Array(24*60).fill(0);

    
    initialHour = initialHour * 60;
    endHour = endHour * 60 -1;

    do{
        let choosenIndex = Math.floor(Math.random() * (endHour - initialHour +1)) + initialHour;
        dayInMinutes[choosenIndex] = 1;
    } while(totalAssigments(dayInMinutes) < totalLikes);
    return dayInMinutes;
}

function arrayConsoleViewer(dayInMinutes, initialHour, endHour) {

    initialHour = initialHour * 60;
    endHour = endHour * 60;

    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let arrayIndex = hour * 60 + minutes;

    dayInMinutes.forEach((element, index) => {

        if(index%60 ==0) {
            console.log("");
        }
        if(index >= initialHour && index < endHour){
            if(index == arrayIndex) {
                process.stdout.write(`${element} `.blue);    
            } else {
                process.stdout.write(`${element} `.green);
            }
    
        } else {
            process.stdout.write(`${element} `);
        }

        
        
        
    });
    console.log("");
}


function arrayTimesViewer(dayInMinutes) {

    dayInMinutes.forEach((element, index) => {
        if(element ==1) {
            let hour = parseInt(index /60);
            let minute = String("0" + (index % 60)).slice(-2);
            process.stdout.write(`${hour}:${minute} `);
        }
    });
    console.log("");

}

function totalAssigments(array) {
    let assigments = 0;
    array.forEach(element => {
        if(element == 1)
            assigments++;
    });
    return assigments;
}

(async () => {
    
    let dayArray = arrayInitializer(initialHour, endHour);
    
    arrayTimesViewer(dayArray);
    arrayConsoleViewer(dayArray, initialHour, endHour);
    let todayMs = new Date().getTime() - new Date().getTimezoneOffset()*60*1000;
    let today = new Date(todayMs);
    

    
    let ig = await login();

    setInterval(async function(){
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let arrayIndex = hour * 60 + minutes;

        if(dayArray[arrayIndex] == 1) {


            var rand = hashtagArray[Math.floor(Math.random() * hashtagArray.length)];
            let posts = await recentHashtagList(ig, rand);
            await likePost(ig, posts[0]);
            dayArray[arrayIndex] = 2;
        }
        if(isArrayFinished(dayArray)) {
            console.log("Generating new Day array".green);
            dayArray = arrayInitializer(initialHour, endHour);
        }

        console.log(arrayIndex);
        arrayConsoleViewer(dayArray, initialHour, endHour);
        

    }, 20000);

    process.on('unhandledRejection', async function(err) {
        console.log(err.response.body);
        if(err.name == "IgActionSpamError") {
            console.log("Spam Error, trying to regenerate the cookie".red);
            await removeCookie(ig);
            ig = await login();
            await sleep(15);
        }
    });
    
    
})();

