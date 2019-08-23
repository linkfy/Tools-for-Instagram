require('dotenv').config();
let fs = require('fs');
let Bluebird = require('bluebird');
let inquirer = require('inquirer');
//Unofficial Repo with media top results
let Api = require('../instagram-private-api/dist/src');
//let Api = require('instagram-private-api');
let _ = require('lodash');
let ig = new Api.IgApiClient();
let colors = require('colors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

function saveCookies(cookies, state) {
	//console.log(cookies);
    //console.log(state);
    var cookiepath = "cookies/" + process.env.IG_USERNAME + ".json";
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
    
    var cookiepath = "cookies/" + process.env.IG_USERNAME + ".json";
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

// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url
ig.state.proxyUrl = process.env.IG_PROXY;
async function login() {
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
        const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        console.log(loggedInUser);
        //console.log(loggedInUser);
        
        }
        // Time to try if we can interact
        // If interaction works, we send the IG session to the result 
        // Inject user information on the interaction intent
        
        try{
            ig.loggedInUser = await ig.account.currentUser();
            console.log("Logged in".green);
        } catch (e){
            console.log(e);
            return console.log("Login failed".red);
        };
        

        //Open DB
        const adapter = new FileSync("./db/"+process.env.IG_USERNAME.toLowerCase()+".json");
        const db = low(adapter);
        db.defaults({likes: [], follows: []}).write()
        ig.shortid = shortid;
        ig.db = db;
        return ig;
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

        // Code is an object, lets parse the content
        code = code.code;
        
        let sendCode = await ig.challenge.sendSecurityCode(code);
        console.log(sendCode);
    }).catch(Api.IgLoginRequiredError, () => {
        if(hasCookies) {
            console.log("Invalid cookies");
        } else {
            // This block is not supossed to be used never (IgLoginBadPasswordError) exists
            console.log("Incorrect password");
        }
    }).catch(Api.IgLoginBadPasswordError, () => {
        console.log("Incorrect password");
    });
    // If result is not undefined we send the ig object session
    return result;
}



module.exports =  login;
