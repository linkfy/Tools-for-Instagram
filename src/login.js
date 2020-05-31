require('dotenv').config();
let fs = require('fs');
let Bluebird = require('bluebird');
let inquirer = require('inquirer');
let _ = require('lodash');
//let Api = null;
let MQTT= require('instagram_mqtt');
let { GraphQLSubscriptions } = require('instagram_mqtt/dist/realtime/subscriptions/graphql.subscription');
let { SkywalkerSubscriptions } = require('instagram_mqtt/dist/realtime/subscriptions/skywalker.subscription');
let ig = null;
let colors = require('colors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');




function saveCookies(inputLogin, cookies, state) {
    let filename = "Undefined";
    if(inputLogin ==  null || inputLogin == undefined) {
        filename = process.env.IG_USERNAME;
    } else {
        filename = inputLogin;
    }
	//console.log(cookies);
    //console.log(state);
    var cookiepath = "cookies/" + (filename).toLowerCase() + ".json";
    if(!fs.existsSync("cookies/")) {
        fs.mkdirSync("cookies/");
    }
    if(!fs.existsSync("db/")) {
        fs.mkdirSync("db/");
    }
    if (!fs.existsSync(cookiepath)) {
        //Create the file if it does not exists
        fs.closeSync(fs.openSync(cookiepath,'w'));
    } else {
       //console.log("File exists on saveCookie function, do not create it again");
    }
    cookies.state = state;
    cookies = JSON.stringify(cookies);
    fs.writeFileSync(cookiepath, cookies);
	return {
		cookies,
		state,
	};
}
async function loadCookies(inputLogin, silentMode = false) {
    let filename = "Undefined";
    if(inputLogin ==  null || inputLogin == undefined) {
        filename = process.env.IG_USERNAME;
    } else {
        filename = inputLogin;
    }
    var cookiepath = "cookies/" + (filename).toLowerCase() + ".json";
    //console.log("Trying to load filepath " + cookiepath);
    //console.log(__dirname);
    if (fs.existsSync(cookiepath)) {
        let cookies =  fs.readFileSync(cookiepath).toString();
        //console.log(cookies);
		// In order to restore session cookies you need this
		await ig.state.deserializeCookieJar(cookies);
        // In order to restore state we use this
		cookies = JSON.parse(cookies);
        ig.state.deviceString = cookies.state.deviceString;
		ig.state.deviceId = cookies.state.deviceId;
		ig.state.uuid = cookies.state.uuid;
		ig.state.phoneId = cookies.state.phoneId;
		ig.state.adid = cookies.state.adid;
	    ig.state.build = cookies.state.build;
        console.log("Cookies loaded".cyan);
        return true;
    }
    if(!silentMode)
        console.log("No cookie file found in loadCookies function");
    return false;
}


//Generate Basic directories
if(!fs.existsSync("output/")) {
    fs.mkdirSync("output/");
}
if(!fs.existsSync("accounts/")) {
    fs.mkdirSync("accounts/");
}

//if Input proxy == false then we force to not use the proxy
async function login(args={}) {
    let {inputLogin=null, inputPassword=null, inputProxy=null, verificationMode=null, silentMode=false, antiBanMode=false, showRealtimeNotifications = false, onlineMode = true} = args;

    
    MQTT.IgApiClientRealtime =  MQTT.withRealtime(new Api.IgApiClient());
    ig = MQTT.IgApiClientRealtime;
    
    if(inputLogin!=null && inputPassword !=null) {
        process.env.IG_USERNAME = inputLogin;
        process.env.IG_PASSWORD = inputPassword;
        
    }
    //If inputProxy == false then we dont set it later on lines below
    if(inputProxy!=null || inputProxy != undefined) {
        process.env.IG_PROXY = inputProxy;
    }
    //If Online mode is changed on the config, it have priority to change the default value:
    if(onlineMode != true) {
        process.env.ONLINE_MODE = onlineMode;
    } else if(process.env.ONLINE_MODE == undefined){
        //console.log("AUTOSET ONLINE MODE");
        process.env.ONLINE_MODE = true;
    } else if(process.env.ONLINE_MODE != undefined) {
        //console.log("Set online mode from ENV");
    
    }

    // You must generate device id's before login.
    // Id's generated based on seed
    // So if you pass the same value as first argument - the same id's are generated every time
    ig.state.generateDevice(process.env.IG_USERNAME);
    

    //If instagramVerification parameter is not null then we parse it
    //Parse Instagram verification to the real parameters
    if(process.env.IG_VERIFICATION == 'sms') {
        process.env.IG_VERIFICATION = 1; //By default IG Verification 1 means by sms
    } else if(process.env.IG_VERIFICATION == 'email') {
        process.env.IG_VERIFICATION = 2;
    }else if(process.env.IG_VERIFICATION == 'otp') {
        process.env.IG_VERIFICATION = 0;
    }
    if(verificationMode!=null) {
        //1 = sms; 2 = email
        process.env.IG_VERIFICATION = verificationMode;
    }

    if(process.env.IG_PROXY && inputProxy != false) {
        if(!silentMode)
            console.log("Using proxy".green);
    } else {
        if(!silentMode) {
            console.log("Not using proxy".yellow);
            console.log("Mobile/Residential proxy recommended".yellow);
        }
    }
    //If proxy is set to false, avoid override using ENV proxy
    if(inputProxy != false)
        ig.state.proxyUrl = process.env.IG_PROXY;
    if(!silentMode)
        console.log("Trying to log with ".cyan + process.env.IG_USERNAME.green);
    //First we check if the user have cookies
    let hasCookies = await loadCookies(inputLogin ,mode = silentMode);
    
 
    // Execute all requests prior to authorization in the real Android application
	// This function executes after every request
	ig.request.end$.subscribe(async () => {
		// Here you have JSON object with cookies.
		// You could stringify it and save to any persistent storage
		const cookies = await ig.state.serializeCookieJar();
		const state = {
			deviceString: ig.state.deviceString,
			deviceId: ig.state.deviceId,
			uuid: ig.state.uuid,
			phoneId: ig.state.phoneId,
			adid: ig.state.adid,
			build: ig.state.build,
		};
		saveCookies(inputLogin, cookies, state);
		// In order to restore session cookies you need this
		await ig.state.deserializeCookieJar(JSON.stringify(cookies));
		ig.state.deviceString = state.deviceString;
		ig.state.deviceId = state.deviceId;
		ig.state.uuid = state.uuid;
		ig.state.phoneId = state.phoneId;
		ig.state.adid = state.adid;
		ig.state.build = state.build;
	});	
    
	await ig.simulate.preLoginFlow();
    let result = await tryToLogin(inputLogin, inputPassword, inputProxy, verificationMode, hasCookies, silentMode);
    // If result is not undefined we send the ig object session
    result.antiBanMode = antiBanMode;
    result.showRealtimeNotifications = showRealtimeNotifications;
    //We use clone to be able to generate new sessions and not overwrite
    //After cloning realtime functions must be copied again from the original IG object, [cloning is not perfect]
    result.realtime = ig.realtime;
    
    const subToLiveComments = (broadcastId) =>
        // you can add other GraphQL subs using .subscribe
        result.realtime.graphQlSubscribe(GraphQLSubscriptions.getLiveRealtimeCommentsSubscription(broadcastId));

    if(result.showRealtimeNotifications) {
        // whenever something gets sent and has no event, this is called
        result.realtime.on('receive', (topic, messages) => {
            console.log('receive', topic, messages);
        });
        result.realtime.on('direct', logEvent('direct'));
        // this is called with a wrapper use {message} to only get the message from the wrapper
        result.realtime.on('message', logEvent('messageWrapper'));
        // whenever something gets sent to /ig_realtime_sub and has no event, this is called
        result.realtime.on('realtimeSub', logEvent('realtimeSub'));
        // whenever the client has a fatal error
        result.realtime.on('error', console.error);
        result.realtime.on('close', () => console.error('RealtimeClient closed'));
    }

    //Go online if online mode is set to true
    //ONLINE_MODE is a string on the env, otherwise if we change the status inside code it is a boolean
    if(process.env.ONLINE_MODE == true || process.env.ONLINE_MODE == "true") {
        console.log("Online Mode".green);
        //Connect to realtime nottifications
        await result.realtime.connect({
            graphQlSubs: [
                // these are some subscriptions
                GraphQLSubscriptions.getAppPresenceSubscription(),

                //Commented for testing purposes:
                //Instagram sends a config update. The App also doesn't subscribe to it anymore:
                //GraphQLSubscriptions.getClientConfigUpdateSubscription(),
                
                GraphQLSubscriptions.getZeroProvisionSubscription(ig.state.phoneId),
                GraphQLSubscriptions.getDirectStatusSubscription(),
                GraphQLSubscriptions.getDirectTypingSubscription(ig.state.cookieUserId),
                GraphQLSubscriptions.getAsyncAdSubscription(ig.state.cookieUserId),
            ],
            skywalkerSubs: [
                SkywalkerSubscriptions.directSub(ig.state.cookieUserId),
                SkywalkerSubscriptions.liveSub(ig.state.cookieUserId)
            ],
            irisData: await ig.feed.directInbox().request(),
        });
    } else {
        console.log("Online Mode disabled".green);
    }
    
    return clone(result);
}



module.exports =  login;


async function tryToLogin(inputLogin, inputPassword, inputProxy, verificationMode, hasCookies, silentMode) {
    
    let result = await Bluebird.try( async() => {
        if(!hasCookies) {
            if(!silentMode)
                console.log("User not logged in, login in");
        let loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

        if(!silentMode) {
            console.log("Logged")
            console.log(loggedInUser);
        } 

        
        }
        // Time to try if we can interact
        // If interaction works, we send the IG session to the result 
        // Inject user information on the interaction intent
        
        try{
            ig.loggedInUser = await ig.account.currentUser();
            
            if(!silentMode)
                console.log("Logged in".green);
        } catch (e) {
            console.log(e);
            //console.log(Object.getOwnPropertyNames ( e ));
            //console.log(e.response.statusCode);
            console.log("Login failed from cookie | Removing incorrect cookie | Trying to regenerate...".red);
            
            //Simulate needed fields:

            /* ig.loggedInUser = new Object();
            ig.loggedInUser.username = inputLogin;
            ig.loggedInUser.inputLogin = inputLogin;
            ig.loggedInUser.inputPassword = inputPassword;
            ig.loggedInUser.inputProxy = inputProxy;
            ig.loggedInUser.verificationMode = verificationMode; */

            ig.loggedInUser = new Object();
            ig.loggedInUser.username = process.env.IG_USERNAME;
            ig.loggedInUser.inputLogin = process.env.IG_USERNAME;
            ig.loggedInUser.inputPassword = process.env.IG_PASSWORD;
            ig.loggedInUser.inputProxy = process.env.IG_PROXY;
            ig.loggedInUser.verificationMode = process.env.IG_VERIFICATION;
            return await regenerateSession(ig, log = false);//"removeCookie";
        };
        //Inject other parameters for regenerateSession() cases
        ig.loggedInUser.inputLogin = inputLogin;
        ig.loggedInUser.inputPassword = inputPassword;
        ig.loggedInUser.inputProxy = inputProxy;
        ig.loggedInUser.verificationMode = verificationMode;

        //Open DB
        const adapter = new FileSync("./db/"+(process.env.IG_USERNAME).toLowerCase()+".json");
        const db = low(adapter);
        db.defaults({likes: [], comments:[], mediaUploaded: [], follows: [], lastFollowers: []}).write()
        ig.shortid = shortid;
        ig.db = db;
        
        return clone(ig);
    }).catch(Api.IgCheckpointError, async () => {

        if(process.env.IG_VERIFICATION == 2) {
            //await ig.challenge.selectVerifyMethod(2); //email old method
            await ig.challenge.auto(true); //Email quick fix, now Mode 2 is solved by automode
        } else if(process.env.IG_VERIFICATION == 1) {
            await ig.challenge.selectVerifyMethod(1);//sms
        }else if(process.env.IG_VERIFICATION == 0) {
            await ig.challenge.selectVerifyMethod(0);//otp 
        }
         else {
            await ig.challenge.auto(true); //Sms it was me
        }

        console.log(ig.state.checkpoint); //Challenge info here
        console.log('Recommended to not open the app during verification / do not answer "it was me" on the phone'.yellow);
        let code = await inquirer.prompt([
            {
                type: 'input',
                name: 'code',
                message: 'Enter code',
            },
        ]);

        // Code is an object, lets parse the content
        code = code.code;
        
        let sendCode = await ig.challenge.sendSecurityCode(code);
        console.log(sendCode);
        console.log("Done! Restart me to start your new session! (Sometimes you need to delete the cookie again after adding the code)".green);
        process.exit();
    }).catch(Api.IgLoginRequiredError, () => {
        if(hasCookies) {
            console.log("Invalid cookies");
        } else {
            // This block is not supossed to be used never (IgLoginBadPasswordError) exists
            console.log("Incorrect password");
            return "incorrectPassword";
        }
    }).catch(Api.IgLoginBadPasswordError, () => {
        console.log("Incorrect password");
        return "incorrectPassword";
    }).catch(Api.IgResponseError, () => {
        console.log("IgResponseError:Bad request // Is your phone number verified? // Did you recieved a Verify message on instagram?".yellow);
        console.log('Press "r" key to retry after verify "It was me" or any other key to Exit'.cyan);
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', function(buff) {
            if(buff.toString() == 'r') {
                console.log("retry");
                return tryToLogin(hasCookies, silentMode, inputLogin, inputPassword, inputProxy, verificationMode)
            } else {
                console.log("exit");
                process.exit();
            }
                
        });
        
        //sleepSync(1000*30);
        //process.exit();
        //return "IgResponseError";
        
    });
    return result;
}

//Use it to generate new sessions without overwrite last ones
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = new obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function logEvent(name) {
    
    return data => console.log(name, data);
}