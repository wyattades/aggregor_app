# Aggregor App
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


## TODO
- implement proper navigation between pages
- planned containers: login, register, account, about, feed-edit, available-plugins, home
- api (proper async loading)
- component/container styles i.e. make it pretty
  - [React Native Elements???](https://react-native-training.github.io/react-native-elements/)
  - [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
  - material design?
  - android AND iOS support?

## ISSUES
- form inputs can get covered by keyboard:
  - add 'android:windowSoftInputMode="adjustResize"' to AndroidManifest.xml ???
  - use KeyBoardAvoidingView