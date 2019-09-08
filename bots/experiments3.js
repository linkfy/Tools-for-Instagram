require('../src/tools-for-instagram.js');

// Daily Actions generator


//console.log(dayInMinutes);
let initialHour = 18, endHour =24;
let dayArray = arrayInitializer(initialHour, endHour);

arrayTimesViewer(dayArray);
arrayConsoleViewer(dayArray, initialHour, endHour);


function arrayInitializer(initialHour, endHour) {
    let dayInMinutes = Array(24*60).fill(0);

    
    initialHour = initialHour * 60;
    endHour = endHour * 60;

    do{
        let choosenIndex = Math.floor(Math.random() * (endHour - initialHour +1)) + initialHour;
        dayInMinutes[choosenIndex] = 1;
    } while(totalAssigments(dayInMinutes) < 80);
    return dayInMinutes;
}

function arrayConsoleViewer(dayInMinutes, initialHour, endHour) {

    initialHour = initialHour * 60;
    endHour = endHour * 60;

    dayInMinutes.forEach((element, index) => {

        if(index%60 ==0) {
            console.log("");
        }
        if(index >= initialHour && index < endHour){
            process.stdout.write(`${element} `.green);
    
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
/* 
(async () => {

})(); */