# Aggregor App
## Setup
### Setup development environment:
- install the following on your system:
  - node v8.x.x
  - npm v5.x.x
  - adb (comes with Android Studio)
	- yarn
- clone aggregor_app github repo to wherever you like
- ```npm install```
### Start Developing:
- start android emulator or plug in android device
- ```npm run android```
- if another command prompt doesn't open automatically: ```npm start```
- reload development environment
### Build Producton App to Connected Device:
- ```npm run android-prod```
## TODO
#1	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/containers/Dashboard.js#15
	TODO: don't allow viewing of NoFeeds???

#2	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/actions/api.js#5
	TODO: many actions do not handle errors correctly, 

#3	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/actions/api.js#6
	TODO: set max timeout for api calls

#4	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/components/Drawer.js#192
	TODO: component should not be 'smart' (by using connect), only containers

#5	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/containers/Loading.js#6
	TODO: remove loading container, just use login?

#6	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/containers/Login.js#18
	TODO: figure out better keyboardAvoiding

#7	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/middleware/feed.js#5
	TODO: move these cases to their corresponding functions in api.js

#8	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/navigator/index.js#22
	TODO: StackNavigator and DrawerNavigator should be less "mobile" focused

#9	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/navigator/index.web.js#25
	TODO: StackNavigator and DrawerNavigator should be less "mobile" focused

#10	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/navigator/navigatorWrapper.web.js#17
	TODO: better way to check for built-in params?

#11	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/navigator/navigatorWrapper.web.js#91
	TODO: don't go back to loading screen if coming from aggregor.com ???

#12	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/reducers/feeds.js#5
	TODO: flatten reducers... maybe in my next lifetime

#13	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/reducers/nav.js#43
	TODO: prevent duplicate route transtions

#14	file:///c%3A/Users/Wyatt/Github/aggregor_app/src/utils/prompt.js#47
	TODO: initial value isn't working. Need to reset form???
