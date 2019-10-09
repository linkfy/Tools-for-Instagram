require('dotenv').config();
let fs = require('fs');
let Bluebird = require('bluebird');
let inquirer = require('inquirer');
let Api = require('instagram-private-api');
let _ = require('lodash');
let ig = new Api.IgApiClient();
let colors = require('colors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');


function saveCookies(cookies, state) {
	//console.log(cookies);
    //console.log(state);
    var cookiepath = "cookies/" + (process.env.IG_USERNAME).toLowerCase() + ".json";
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
async function loadCookies() {
    
    var cookiepath = "cookies/" + (process.env.IG_USERNAME).toLowerCase() + ".json";
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
    console.log("No cookie file found in loadCookies function");
    return false;
}


//Generate Basic directories
if(!fs.existsSync("output/")) {
    fs.mkdirSync("output/");
}
if(!fs.existsSync("logins/")) {
    fs.mkdirSync("logins/");
}

// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
ig.simulate.preLoginFlow();
// Optionally you can setup proxy url

//if Input proxy == false then we force to not use the proxy
async function login(inputLogin = null, inputPassword = null, inputProxy = null, verificationMode = null, silentMode = false) {
    if(inputLogin!=null && inputPassword !=null) {
        process.env.IG_USERNAME = inputLogin;
        process.env.IG_PASSWORD = inputPassword;
        if(inputProxy!=null && inputProxy != false)
            process.env.IG_PROXY = inputProxy;
        
    }
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
        console.log("Using proxy".green);
    } else {
        console.log("Not using proxy".yellow);
        console.log("Mobile/Residential proxy recommended".yellow);
    }

    ig.state.proxyUrl = process.env.IG_PROXY;
    console.log("Trying to log with ".cyan + process.env.IG_USERNAME.green);
    //First we check if the user have cookies
    let hasCookies = await loadCookies();
    
 
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
		saveCookies(cookies, state);
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
    let result = await Bluebird.try( async() => {
        if(!hasCookies) {
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
            console.log("Logged in".green);
        } catch (e){
            console.log(e);
            console.log("Login failed from cookie | Remove incorrect cookie".red);
            return "removeCookie";
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
        
        return ig;
    }).catch(Api.IgCheckpointError, async () => {

        if(process.env.IG_VERIFICATION == 2) {
            await ig.challenge.selectVerifyMethod(2); //email
        } else if(process.env.IG_VERIFICATION == 1) {
            await ig.challenge.selectVerifyMethod(1);//sms
        }else if(process.env.IG_VERIFICATION == 0) {
            await ig.challenge.selectVerifyMethod(0);//otp 
        }
         else {
            await ig.challenge.auto(true); //Sms it was me
        }

        console.log(ig.state.checkpoint); //Challenge info here
        
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
        console.log("Done! Restart me to start your new session!".green);
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
        console.log("IgResponseError:Bad request // Is your phone number verified?".yellow);
        process.exit();
        return "IgResponseError";
    });
    // If result is not undefined we send the ig object session
    return result;
}



module.exports =  login;
