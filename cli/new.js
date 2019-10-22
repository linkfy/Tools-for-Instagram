var inquirer = require('inquirer');
var path = require('path');
var appDir = path.dirname(require.main.filename);

let command = process.argv[2];
if(command == 'bot') {
    let botName = inquirer.prompt([
        { 
            type: 'input',
            name: 'botName',
            message:"Set the bot name",
        }
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
      console.log(answers);
      console.log(process.env.PWD);
    });
}


