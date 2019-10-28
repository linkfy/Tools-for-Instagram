var cmd=require('node-cmd');
var Promise = require('bluebird');
var fs = require("fs");
var exec = require('child_process').execSync;
const cmdAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });
require('../Tools-for-Instagram');

(async() => {
    
    let link = "https://www.instagram.com/p/B4GmSuZJm_D/";
    //exec("adb shell am start -n com.instagram.android/com.instagram.android.activity.MainTabActivity -d "+link);
    await sleep(2)
    exec('adb exec-out screencap -p /mnt/sdcard/sc.png');
    exec('adb pull /mnt/sdcard/sc.png');
    res = getResolution();
    //relativeLike(res[0], res[1]);
    console.log(getResolution());
})();







function getResolution(){
    let res = exec('adb shell wm size').toString();
    res = res.replace("Physical size: ", "");
    res = res.replace(" ", "");
    res = res.replace("\r\n", "");
    resolution = res.split("x");
    resolution = [parseInt(resolution[0]), parseInt(resolution[1])];
    return resolution;
}


function relativeLike(w, h) {
    let relativeW = 0.072
    let relativeH = 0.82

    likeW = parseInt(w * relativeW)
    likeH = parseInt(h * relativeH)

    exec("adb shell input tap " + likeW + " " + likeH);
}






















/* 




let Api = require('instagram-private-api');
let ig = new Api.IgApiClient();


ig.state.generateDevice(process.env.IG_USERNAME);

//console.log(ig);



//Steps:
//Registration Create Resource
let email = 'ttesting1234testagain@gmail.com';
let username = 'ttesting1234testagain';
let password = 'ttestagain4564';
let first_name = 'ttestagain4564';
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

    const resp = await ig.account.create(myU);
    console.log(resp);
    /* let response = await ig.request.send({
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
      console.log(response.body.errors); */
    //Set POST
    
    //DO RegistrationCreate endpoint
    
    //Set Data
    
    //Sign Payload
    
    //Send
//})();
 