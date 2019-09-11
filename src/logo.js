let colors = require('colors');
function logo() {
    let end = false;
    let spaces = "                                 "
    
    do {
    process.stdout.write('\033c');
    console.log(`
` + spaces + `  _____ __ _
` + spaces + ` |_   _/ _(_)
` + spaces + `   | || |_| |
` + spaces + `   | ||  _| |
` + spaces + `   |_||_| |_|
` + spaces + `       Tools for instagram

`);
    sleepSync(5);
    spaces = spaces.substr(0, spaces.length-1);
    } while(spaces.length > 0);

    paint();
    sleepSync(20);
    

    
}


module.exports = logo;


function paint() {

    let textLines = [
        "", 
        " _____ __ _",
        "|_   _/ _(_)",
        "  | || |_| |",
        "  | ||  _| |",
        "  |_||_| |_|",
        "      Tools for instagram".trap]
    
    for(arrayIndex = 0; arrayIndex< textLines.length; arrayIndex++) {
        process.stdout.write('\033c');
        
        textLines.forEach((line, index) => {
            
            if(index <= arrayIndex) {

                console.log(line.green);

            } else {

                console.log(line);
            }
        });
        sleepSync(30);
        

    }
    for(let i = 0; i<=10; i++) {
        process.stdout.write('\033c');
        if(i<10) {
            textLines[textLines.length-1]=    "      Tools for instagram".trap;
        } else {
            textLines[textLines.length-1]=    "      Tools for instagram by @Linkfy";
        }
        textLines.forEach(line => {
            console.log(line.green);
        });
        sleepSync(20);
    } 
        
}