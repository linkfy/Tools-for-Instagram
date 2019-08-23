# Tools-for-Instagram
Automation scripts for Instagram </br></br>
<img src="https://media.giphy.com/media/ignhVpXU7h4qHMwXix/giphy.gif" width="340">
## How to use it
    1. Rename .env_example to .env and edit the configuration.
    2. Execute main.js to test the scripts. 
## Bot skills:
- [x] Login Flow
- [x] Save Cookies in files
- [x] Get User Information
- [x] Get Followers of account (save into a txt file)
- [x] Like Content by URL
- [x] Like Content by MediaId 
- [x] Like Content by Post
- [x] Follow by Username
- [x] Unfollow by Username
- [x] Get recent posts list of a hashtag
- [~] Get top posts list of a hashtag // Using deopard Repo edit to implement it
- [x] Get recent post list by location
- [x] Get top post list by location
- [x] Save post list into scrape list
- [x] Implement lowdb Database
- [x] Save Likes information
- [x] Save Follows information
- [X] Save Unfollows information
- [X] Get Like activity
- [ ] Get Follow activity
- [ ] Get Unfollow activity
- [ ] Multi-login
- [ ] Simple Bot
- [ ] Postprocessing of scrape list (detect faces, language, business accounts)
## Wiki

https://github.com/linkfy/Tools-for-Instagram/wiki

## Follow the project

You can follow the streams of the project on the Twitch channel<br>
https://www.twitch.tv/mimi_twitchbot

## Follow the development status

Follow the development status to see what's the next upcoming idea<br>
https://trello.com/b/ZlwRr6l0/tools-for-instagram


## Api mods

- Injected loggedInUser inside ig Object after login (ig.loggedInUser)
- Injected db inside ig Object after login (ig.db)
- Injected shortid generator inside ig Object

# Api
### Basic example
```javascript
require('./src/tools-for-instagram');

(async () => {
    let ig = await login();
    
    // .. Implement your code here
    let info = await getUserInfo(ig, "Instagram");
    console.log("User information, username: " + info.username);
    
    // ..

})();

```
#### getUserInfo(ig, username)
Get the user information of the desired username
```javascript
   let info = await getUserInfo(ig, 'Instagram');
```
#### getFollowers(ig, username)
It will save the followers inside the outputfolder with the format "acountName_followers.json"
```javascript
   await getFollowers(ig, 'Instagram');
```
#### likeUrl(ig, username, [force: bool])
like the desired instagram Url, the like will be saved inside database. 
```javascript
   await likeUrl(ig, 'https://www.instagram.com/p/B1gzzVpA462/');
```
If 'force' is set to true, when the item was already liked before it will force to continue the operation.
```javascript
   await likeUrl(ig, 'https://www.instagram.com/p/B1gzzVpA462/', true);
```

### This documentation is not yet finished...
