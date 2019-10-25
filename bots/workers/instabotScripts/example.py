import instabot
import argparse
import time
import sys, traceback
print "Welcome to instabot custom script loaded in TFI"
parser = argparse.ArgumentParser(add_help=True)
parser.add_argument("-u", type=str, help="username")
bot = instabot.Bot()
args = parser.parse_args()
bot.login(username=args.u)

print "Getting information from account linkfytester"
userId = bot.convert_to_user_id('linkfytester')
userInfo = bot.get_user_info(userId)
print "Bio received! " + userInfo['biography']
print("Instabot Example Done")