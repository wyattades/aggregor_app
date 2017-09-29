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

- Route with react-router
- Use react-motion-drawer and react-native-drawer for small screens (for web and native respectively)
- Let client handle all url paths with custom Cloudfront error handler: 404 -> index.html
- Add Media component that works for native and web
- Prettify empty feed/plugin messages

#1	file:///home/wyatt/Github/aggregor_app/src/components/Drawer.js#194
	TODO: component should not be 'smart' (by using connect), only containers

#2	file:///home/wyatt/Github/aggregor_app/src/containers/Loading.js#6
	TODO: remove loading container, just use login?

#3	file:///home/wyatt/Github/aggregor_app/src/containers/Dashboard.js#15
	TODO: don't allow viewing of NoFeeds???

#4	file:///home/wyatt/Github/aggregor_app/src/containers/Login.js#18
	TODO: figure out better keyboardAvoiding

#5	file:///home/wyatt/Github/aggregor_app/src/middleware/feed.js#5
	TODO: move these cases to their corresponding functions in api.js

#6	file:///home/wyatt/Github/aggregor_app/src/utils/prompt.js#47
	TODO: initial value isn't working. Need to reset form???

#7	file:///home/wyatt/Github/aggregor_app/src/navigator/index.js#20
	TODO: StackNavigator and DrawerNavigator should be less "mobile" focused

#8	file:///home/wyatt/Github/aggregor_app/src/navigator/navigatorWrapper.web.js#7
	TODO: entering custom url doesn't work

#9	file:///home/wyatt/Github/aggregor_app/src/navigator/navigatorWrapper.web.js#19
	TODO: better way to check for built-in params?

#10	file:///home/wyatt/Github/aggregor_app/src/navigator/navigatorWrapper.web.js#97
	TODO: don't go back to loading screen if coming from aggregor.com ???

#11	file:///home/wyatt/Github/aggregor_app/src/reducers/feeds.js#5
	TODO: flatten reducers... maybe in my next lifetime

#12	file:///home/wyatt/Github/aggregor_app/src/reducers/nav.js#42
	TODO: prevent duplicate route transtions

#13	file:///home/wyatt/Github/aggregor_app/src/actions/api.js#5
	TODO: many actions do not handle errors correctly, 

#14	file:///home/wyatt/Github/aggregor_app/src/actions/api.js#6
	TODO: set max timeout for api calls