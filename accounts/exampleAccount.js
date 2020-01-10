module.exports = {
    inputLogin: 'accountName',
    inputPassword: 'password',

    //OPTIONAL PARAMETERS [You can delete it]:
    inputProxy: 'http://proxyuser:proxypassword@xxx.xxx.xxx.xxx:xxxxx', //set to false to prevent .env default proxy on this account
    verificationMode: '1', // '0' = OTP; '1' = sms, '2' = email, null = automatic mode,
    silentMode: false,
    antiBanMode: false,
    onlineMode: true, //Show green dot status, true is recommended to avoid some scrap limitations
    showRealtimeNotifications: false //False is recommended, use only for facebook/graphql notification system debugging
    //END OF OPTIONAL PARAMETERS

}