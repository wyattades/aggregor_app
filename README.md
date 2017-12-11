# Aggregor

Aggregor combines other news and social feeds into one infinite-scrolling page. The user can view and manage multiple personal news feeds.

This project mainly served as a learning experience and proof of concept for a fully cross-platform react app i.e. the same code-base is used on web, android, and ios.

See the Aggregor server [source](https://github.com/wyattades/aggregor_server)

![](https://i.imgur.com/aGfc6o1.gif)
Visit the web app: [aggregor.com](https://aggregor.com/)  

### Initiate Development Environment
1. Install ```node``` v8.x.x
2. Install ```adb``` (comes with Android Studio)
3. ```$ git clone https://github.com/wyattades/aggregor_app.git```
4. ```$ cd aggregor_app```
5. ```$ npm install```

### Start Developing
#### Android:
1. Start android emulator or plug in android device
2. ```$ npm run android```
3. If another command prompt doesn't open automatically: ```$ npm start```
4. Reload development environment  
#### Web:
1. ```$ npm run dev```
2. Open ```localhost:8080``` in your web browser

### Build Producton App:
- Android: ```npm run android-prod```
- Web: ```npm run build```

### Editor Config
- If you want to lint the javascript while editing, install an ```eslint``` plugin
- A ```babel``` parser may be required for es6 syntax

### Technologies
- [React Native](https://facebook.github.io/react-native/) and [React Native Web](http://necolas.github.io/react-native-web/storybook/): allowed for cross-platform React code
- [React Router](https://reacttraining.com/react-router/): IMO all-around best navigator for React on any platform 
- [Redux](https://redux.js.org/): app state manager  
- [Immutable.js](http://facebook.github.io/immutable-js/docs/#/): used allongside Redux to make state immutable  
- [Sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html) (.scss): Css but with variables, nested classes, and more
- [ejs](http://ejs.co/) (.ejs): simple HTML templating language
- [webpack](https://webpack.js.org/): asset and code bundler for the web
