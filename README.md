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
#1 file:///home/wyatt/Github/aggregor_app/src/containers/Loading.js:6:4
- TODO: remove loading container, just use login?

#2	file:///home/wyatt/Github/aggregor_app/src/middleware/feed.js:6:4
- TODO: move these cases to their corresponding functions in api.js

#3	file:///home/wyatt/Github/aggregor_app/src/utils/prompt.js:5:4
- TODO: remake prompt: styles, allow regex matching, custom buttons

#4	file:///home/wyatt/Github/aggregor_app/src/reducers/feeds.js:5:4
- TODO: flatten reducers... maybe in my next lifetime

#5	file:///home/wyatt/Github/aggregor_app/src/reducers/nav.js:36:4
- TODO: prevent duplicate route transtions

#6	file:///home/wyatt/Github/aggregor_app/src/actions/api.js:8:4
- TODO: many actions do not handle errors correctly, fix


