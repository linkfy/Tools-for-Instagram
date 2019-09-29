
require('../src/tools-for-instagram.js');

(async () => {


    console.log("\n -- Get last messages from Inbox --\n".bold.underline);
    let ig = await login();

    let inbox = await getInbox(ig);
    inbox.forEach(chat => {

        
        if(chat.lastMessage.messageContent != undefined) {

            console.log(chat.lastMessage.messageContent);
            console.log("----");
        }

    });

    console.log("\nProcess done!\n".green);
    
})();

