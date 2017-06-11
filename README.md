# Aggregor App
## Setup
### Setup development environment:
- install the following on your system:
  - node v7.8.0
  - npm v4.2.0
  - yarn v0.23.4
  - react-native-cli v2.0.1
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
#1	src/actions/api.js:6:4
- TODO: many actions do not handle errors correctly, allErrors doesn't catch correctly

#2	src/containers/Loading.js:6:4
- TODO: remove loading container, just use login?

#3	src/middleware/feed.js:6:4
- TODO: it might be possible to move most of these cases their corresponding functions in api.js

#4	/src/reducers/feeds.js:5:4
- TODO: flatten reducers... maybe in my next lifetime

#5	src/reducers/nav.js:5:4
- TODO: prevent duplicate route transtions

#6	src/components/Header.js:57:6
- TODO: support renaming feeds


