# Aggregor App
## Setup
### Setup development environment:
- install the following on your system:
  - node v7.x.x
  - npm v4.x.x
  - adb (comes with Android Studio)
- clone aggregor_app github repo to wherever you like
- ```npm install```
### Start Developing:
- start android emulator or plug in android device
- ```npm run android```
- ```npm start```
- reload development environment
### Build Producton App to Connected Device:
- ```npm run android-prod```
## TODO
#1	file:///home/wyatt/Github/aggregor_app/src/containers/Loading.js:6:4
TODO: remove loading container, just use login?

#2	file:///home/wyatt/Github/aggregor_app/src/containers/Dashboard.js:15:4
	TODO: don't allow viewing of NoFeeds???

#3	file:///home/wyatt/Github/aggregor_app/src/containers/Login.js:18:4
	TODO: figure out better keyboardAvoiding

#4	file:///home/wyatt/Github/aggregor_app/src/middleware/feed.js:5:4
	TODO: move these cases to their corresponding functions in api.js

#5	file:///home/wyatt/Github/aggregor_app/src/navigator/index.js:24:4
	TODO: StackNavigator and DrawerNavigator should be less "mobile" focused

#6	file:///home/wyatt/Github/aggregor_app/src/navigator/navigatorWrapper.web.js:17:10
	TODO: better way to check for built-in params?

#7	file:///home/wyatt/Github/aggregor_app/src/navigator/navigatorWrapper.web.js:91:10
	TODO: don't go back to loading screen if coming from aggregor.com ???

#8	file:///home/wyatt/Github/aggregor_app/src/reducers/nav.js:42:4
	TODO: prevent duplicate route transtions

#9	file:///home/wyatt/Github/aggregor_app/src/styles/styles.default.scss:30:4
	TODO: Slider styles

#10	file:///home/wyatt/Github/aggregor_app/src/reducers/feeds.js:5:4
	TODO: flatten reducers... maybe in my next lifetime

#11	file:///home/wyatt/Github/aggregor_app/src/actions/api.js:3:4
	TODO: many actions do not handle errors correctly, 

#12	file:///home/wyatt/Github/aggregor_app/src/actions/api.js:4:4
	TODO: set max timeout for api calls

#13	file:///home/wyatt/Github/aggregor_app/src/components/Drawer.js:192:4
	TODO: component should not be 'smart' (by using connect), only containers
