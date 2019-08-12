//import { IgApiClient } from './src';
//import { sample } from 'lodash';
//const ig = new IgApiClient();
require('dotenv').config();
let Bluebird = require('bluebird');
let inquirer = require('inquirer');
let Api = require('instagram-private-api');
let _ = require('lodash');
let ig = new Api.IgApiClient();

console.log("Trying to log with " + process.env.IG_USERNAME);
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url
ig.state.proxyUrl = process.env.IG_PROXY;
(async () => {
    // Execute all requests prior to authorization in the real Android application
    await ig.simulate.preLoginFlow();
    Bluebird.try( async() => {

        const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        console.log(loggedInUser);

    }).catch(Api.IgCheckpointError, async () => {

        console.log(ig.state.checkpoint);
        await ig.challenge.auto(true); //Sms it was me
        console.log(ig.state.checkpoint); //Challenge info here
        
        let code = await inquirer.prompt([
            {
                type: 'input',
                name: 'code',
                message: 'Enter code',
            },
        ]);

        //Code is an object, lets parse the content
        code = code.code;
        
        let sendCode = await ig.challenge.sendSecurityCode(code);
        console.log(sendCode);
    });
})();
