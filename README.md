/# Aggregor App
## Setup
### Setup development environment:
- make sure the following are installed on your system:
  - node v7.8.0
  - npm v4.2.0
  - yarn v0.23.4
  - react-native-cli v2.0.1
- clone aggregor_app github repo to wherever you like
- <code>npm install</code>
### Start Developing:
- start android emulator or plug in android device
- <code>npm run android</code>
- <code>npm start</code>, then double tap R in emulator 
### Build Producton App to Connected Device:
- <code>npm run bundle-android</code>
- <code>npm run android</code>
- (I think)


## TODO
#1	file:///home/wyatt/Github/aggregor_app/src/containers/PluginEdit.js:10:4
- TODO: Use selector for plugin type

#2	file:///home/wyatt/Github/aggregor_app/src/containers/Dashboard.js:8:4
- TODO: add indicator for loading and plugin errors

#3	file:///home/wyatt/Github/aggregor_app/src/utils/records.js:11:4
- TODO: move priority outside data (because its a required value)

#4	file:///home/wyatt/Github/aggregor_app/src/reducers/feeds.js:5:4
- TODO: flatten reducers... maybe in my next lifetime

#5	file:///home/wyatt/Github/aggregor_app/src/components/Entry.js:6:4
- TODO: finish designing Entry component

#6	file:///home/wyatt/Github/aggregor_app/src/components/Form.js:7:4
- TODO: fix form inputs sometimes covered by keyboard (specifically register)

TODO: remove loading container, just use login?