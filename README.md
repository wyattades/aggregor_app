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

- Prettify empty feed/plugin messages	
- Animations between routes
- Placeholder entries for infinite loader
- Use web fonts instead of react-native-vector-icons
- Don't call setFeed in loadInit (404 never gets used!)

#1	file:///home/wyatt/Github/aggregor_app/src/containers/Dashboard.js#19
	TODO: don't allow viewing of NoFeeds???

#2	file:///home/wyatt/Github/aggregor_app/src/containers/Login.js#18
	TODO: figure out better keyboardAvoiding

#3	file:///home/wyatt/Github/aggregor_app/src/containers/ErrorPage.js#51
	TODO: try <Link to="/login" component={Touchable}/>

#4	file:///home/wyatt/Github/aggregor_app/src/index.js#7
	TODO: figure out the source of this error

#5	file:///home/wyatt/Github/aggregor_app/src/utils/prompt.js#47
	TODO: initial value isn't working. Need to reset form???

#6	file:///home/wyatt/Github/aggregor_app/src/Routes.js#57
	TODO: use location.state instead of query?

#7	file:///home/wyatt/Github/aggregor_app/src/reducers/feeds.js#5
	TODO: flatten reducers... maybe in my next lifetime

#8	file:///home/wyatt/Github/aggregor_app/src/actions/api.js#6
	TODO: many actions do not handle errors correctly, 

#9	file:///home/wyatt/Github/aggregor_app/src/actions/api.js#7
	TODO: set max timeout for api calls

#10	file:///home/wyatt/Github/aggregor_app/src/components/Header.js#97
	TODO: avoid passing path

#11	file:///home/wyatt/Github/aggregor_app/src/components/StaticDrawer.js#9
	TODO: width is redundant property (should use flex-basis?)