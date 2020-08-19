
require('dotenv').config();
let Api = require('instagram-private-api');
let ig = new Api.IgApiClient();
let Bluebird = require('bluebird');
let inquirer = require('inquirer');
const request = require('request');

ig.state.generateDevice(process.env.IG_USERNAME);
ig.state.proxyUrl = process.env.IG_PROXY

//console.log(ig);



//Steps:
//Registration Create Resource
let email = 'aaaa@aaaa.net';
let username = '123456aaaabbbbcccc';
let password = 'aaaabbbbccccdddd';
let first_name = 'FirstName';
let uuid = ig.state.uuid;
//WEIRD PARAMETERS
let guid = uuid; //WTF is this? Unknown right now
let force_sign_up_code = '';
let qs_stamp = '';

//console.log(ig.state);
(async() => {

    const myU = {
        username: username,
        password: password,
        email: email,
        first_name: first_name,
    };

    //const resp = await ig.account.create(myU);
    //console.log(resp);
    let result = await Bluebird.try( async() => { 

        let response = await ig.request.send({
            url: '/api/v1/accounts/create/',
            qs: {
                guid: ig.state.uuid,
                device_id: ig.state.deviceId,
            },
            method: 'POST',
            form: ig.request.sign({
                phone_id: ig.state.uuid,
                username: username,
                password: password,
                first_name: first_name,
                guid: uuid,
                email: email,
                device_id: ig.state.deviceId,
                force_sign_up_code: '',
                qs_stamp: '',
    
            }),
          });
        console.log(response.body.errors);
        

    }).catch(Api.IgCheckpointError, async (e) => {
        console.log('challenge');
        const url = e.response.body.challenge.api_path;
        // get info
        console.log(await challengeIndex(url));
        // default option
        console.log(await challengeIndex(url, { choice: '0' }));
        
        let code = await inquirer.prompt([
            {
                type: 'input',
                name: 'code',
                message: 'Enter code',
            },
        ]);
        code = code.code;
        
        let sendCode = await ig.challenge.sendSecurityCode(code);
        console.log(sendCode);
        console.log("Done! Restart me to start your new session! (Sometimes you need to delete the cookie again after adding the code)".green);
        process.exit();
    });

    
     
    //Set POST
    
    //DO RegistrationCreate endpoint
    
    //Set Data
    
    //Sign Payload
    
    //Send
})();

async function challengeIndex(url, params = {}) {
    return request({
        url: `https://i.instagram.com${url}`,
        method: 'POST',
        form: {
            ...params,
        },
        resolveWithFullResponse: true,
        simple: false,
        // transform: requestTransform,
        strictSSL: false,
        gzip: true,
        headers: {
            Host: 'i.instagram.com',
            Connection: 'close',
            Origin: 'https://i.instagram.com',
            'X-IG-WWW-Claim': '0',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': `Mozilla/5.0 (Linux; Android 8.0.0; Custom Build/OPR6.170623.017; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.125 Mobile Safari/537.36 Instagram ${ig.state.appVersion} Android (${ig.state.deviceString}; ${ig.state.language}; ${ig.state.appVersionCode})`,
            'X-CSRFToken': ig.state.cookieCsrfToken,
            'X-IG-App-ID': ig.state.fbOrcaApplicationId,
            'Referer': `https://i.instagram.com${url}`,
            // X-Mid, X-Instagram-AJAX
        },
        jar: ig.state.cookieJar,
    });
}