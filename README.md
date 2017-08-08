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
#1	file:///home/wyatt/Github/aggregor_app/src/containers/Dashboard.js:14:4
- TODO: don't allow viewing of NoFeeds???

#2	file:///home/wyatt/Github/aggregor_app/src/navigator/index.js:23:4
- TODO: implement browserAppContainer for web (for hash routing)

#3	file:///home/wyatt/Github/aggregor_app/src/navigator/index.js:25:4
- TODO: StackNavigator and DrawerNavigator should be less "mobile" focused

#4	file:///home/wyatt/Github/aggregor_app/src/navigator/index.js:76:33
- TODO: instead test for Dimensions.width???

#5	file:///home/wyatt/Github/aggregor_app/src/components/InfList.web.js:8:4
- TODO: scrolling, row height, and onEndReached don't work correctly

#6	file:///home/wyatt/Github/aggregor_app/src/components/Form.js:10:4
- TODO: fix styles for web

#7	file:///home/wyatt/Github/aggregor_app/src/containers/Loading.js:6:4
- TODO: remove loading container, just use login?

#8	file:///home/wyatt/Github/aggregor_app/src/containers/Login.js:12:4
- TODO: figure out better keyboardAvoiding

#9	file:///home/wyatt/Github/aggregor_app/src/middleware/feed.js:5:4
- TODO: move these cases to their corresponding functions in api.js

#10	file:///home/wyatt/Github/aggregor_app/src/utils/prompt.js:5:4
- TODO: remake prompt: styles, allow regex matching, custom buttons

#11	file:///home/wyatt/Github/aggregor_app/src/reducers/feeds.js:5:4
- TODO: flatten reducers... maybe in my next lifetime

#12	file:///home/wyatt/Github/aggregor_app/src/reducers/nav.js:36:4
- TODO: prevent duplicate route transtions

#13	file:///home/wyatt/Github/aggregor_app/src/styles/styles.default.scss:15:4
- TODO: Slider styles

#14	file:///home/wyatt/Github/aggregor_app/src/actions/api.js:8:4
- TODO: many actions do not handle errors correctly, fix

#15	file:///home/wyatt/Github/aggregor_app/src/components/Drawer.js:179:4
- TODO: component should not be 'smart' (by using connect), only containers
