module.exports = {
    inputLogin: 'accountName',
    inputPassword: 'password',

    //OPTIONAL PARAMETERS [You can delete it]:
    inputProxy: 'http://proxyuser:proxypassword@xxx.xxx.xxx.xxx:xxxxx', //set to false to prevent .env default proxy on this account
    verificationMode: '1', // '0' = OTP; '1' = sms, '2' = email, null = automatic mode,
    silentMode: false,
    antiBanMode: false,
    //END OF OPTIONAL PARAMETERS

}