#!/usr/bin/env node
var inquirer = require('../node_modules/inquirer');

var path = require('path');
var fs = require('fs');
const { spawn } = require('child_process');




let command = process.argv[2];
switch (command) {
    case "new":
        _new();
        break;
    case "help":
        help();
        break;
    case "start":
        start();
        break;
    default:
        console.log("Unknown parameter, use tfi help");
}



function _new() {
    let command = process.argv[3];
    switch (command) {
        case "bot":
            newBot();
            break;
        default:
            console.log("Use: tfi help");
    }

}

function start() {
    var argv = require('../node_modules/minimist')(process.argv.slice(3));
    console.log(argv.b);
    console.log(argv.u);
    console.log(argv.p);
    console.log(argv.y);
    //If proxy is undefined then send null
    argv.y = (argv.y === undefined ? null : "'" + argv.y.toString() + "'");
    let file = fs.readFileSync(process.env.PWD+'/'+ argv.b).toString();
    file = file.replace("'./src/tools-for-instagram.js'", "'../src/tools-for-instagram.js'");
    file = file.replace('"./src/tools-for-instagram.js"', '"../src/tools-for-instagram.js"');
    file = file.replace("login()", `login({inputLogin: '${argv.u}', inputPassword: '${argv.p}', inputProxy: ${argv.y}})`);
    console.log(file);
    (async () => {await eval(file); process.exit();})();
    
    
}

function newBot() {
    let value = process.argv[4];
    if(value == undefined) {
        inquirer.prompt([
            { 
                type: 'input',
                name: 'botName',
                message:"Set the bot name",
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            generateBot(answers.botName);

        });
    } else {
        generateBot(value);
    }
}

function help() {
    console.log("Create new bot: tfi new bot");
    console.log("Create new bot called myBot: tfi new bot myBot");
    console.log("Execute bot: tfi start -b bots/botname.js -u username -p password -y proxy ")
}


function generateBot(botName) {
    let botContent =
`require('../src/tools-for-instagram.js');

(async () => {

    console.log("\\n-- Bot `+botName+` --\\n".bold.underline);
    let ig = await login();

    //Add your code here...
    
})();
`;
    
    fs.mkdirSync(process.env.PWD+'/bots/', { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.writeFileSync(process.env.PWD+"/bots/"+botName+".js", botContent,  { flag: 'wx' });
    console.log("Bot created :" + process.env.PWD+"/bots/"+botName+".js");
}

