import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

class LoadingScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ backgroundColor: 'rgba(100,250,180,.5)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading Screen</Text>
        <Button
          onPress={() => navigate('Auth')}
          title="Next"
        />
      </View>
    );
  }
}

class Auth extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ backgroundColor: 'rgba(100,200,200,.5)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Auth Screen</Text>
        <Button
          onPress={() => navigate('Main')}
          title="Next"
        />
      </View>
    );
  }
}

class Main extends React.Component {
  static navigationOptions = {
    title: 'Main',
    header: ({ navigate }) => ({
      style: { backgroundColor: 'rgb(200, 200, 200)' },
      left: (
        <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
          <Text>
            Open
          </Text>
        </TouchableOpacity>
      )
    })
  };
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={{ backgroundColor: 'rgba(200,230,55,.5)', flex: 1, justifyContent: 'center' }}>
        <Text>Main Page</Text>
        <Button
          onPress={() => goBack(null)}
          title="Pop"
        />
      </View>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////

class Teams extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Teams',
      icon: ({ tintColor }) => (
        <Image
          source={{ uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQfSclNV5kbo5PoiruJv7QBgBykckcJpakooJU2sjUufHn4gLBzuw' }}
          style={styles.icon}
        />
      ),
    }),
    header: ({ navigate }) => ({
      title: 'Teams',
      left: (
        <TouchableOpacity onPress={() => navigate('DrawerOpen') }>
          <Image
            source={{ uri: 'https://cdn0.iconfinder.com/data/icons/ui-glyph/100/burger_menu-256.png' }}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        </TouchableOpacity>
      )
    })
  }

  render() {
    // const { navigate, goBack } = this.props.navigation;

    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(32,64,219,.5)', justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Teams
        </Text>
      </View>
    );
  }
}

class Profile extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Profile',
      icon: ({ tintColor }) => (
        <Image
          source={{ uri: 'http://imageog.flaticon.com/icons/png/512/44/44325.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF' }}
          style={styles.icon}
        />
      ),
    }),
    header: ({ navigate }) => ({
      title: 'Profile',
      left: (
        <TouchableOpacity onPress={() => navigate('DrawerOpen') }>
          <Image
            source={{ uri: 'https://cdn0.iconfinder.com/data/icons/ui-glyph/100/burger_menu-256.png' }}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(232,164,119,.5)', justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Profile
        </Text>
      </View>
    );
  }
}

class Notifications extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Notifications',
      icon: ({ tintColor }) => (
        <Image
          source={{ uri: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQsiTrxQX7_S_bcw7_9-TxwVpsGNu4xQAGAgvbr4rEUfOGEjUTk' }}
          style={styles.icon}
        />
      ),
    }),
    header: ({ navigate }) => ({
      title: 'Notifications',
      left: (
        <TouchableOpacity onPress={() => navigate('DrawerOpen') }>
          <Image
            source={{ uri: 'https://cdn0.iconfinder.com/data/icons/ui-glyph/100/burger_menu-256.png' }}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(23,164,219,.5)', justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Notifications
        </Text>
      </View>
    );
  }
}

const MainStack = StackNavigator({
  Main: { screen: Main },
});

const TeamsStack = StackNavigator({
  Teams: { screen: Teams },
});

const ProfileStack = StackNavigator({
  Profile: { screen: Profile },
});

const NotificationsStack = StackNavigator({
  Notifications: { screen: Notifications },
});

const DrawerNav = DrawerNavigator({
  // Main: { screen: MainStack },
  Teams: { screen: TeamsStack },
  Profile: { screen: ProfileStack },
  NotificationsStack: { screen: NotificationsStack },
});

const AppNav = StackNavigator(
  {
    Loading: { screen: LoadingScreen },
    Auth: { screen: Auth },
    Main: { screen: Main },
    Drawer: { screen: DrawerNav },
  },
  {
    headerMode: 'none'
  }
);

AppRegistry.registerComponent('Aggregor', () => AppNav);