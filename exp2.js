
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

    //const resp = await ig.account.create(myU);
    //console.log(resp);
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
    //Set POST
    
    //DO RegistrationCreate endpoint
    
    //Set Data
    
    //Sign Payload
    
    //Send
})();