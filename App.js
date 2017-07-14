import React from 'react';
import Expo, { Font } from 'expo';
import PropTypes from 'prop-types';
import { AppRegistry, Text, View, Button } from 'react-native';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import { FontAwesome } from '@expo/vector-icons';
import Stack from './navigator/mainStack';


export default class App extends React.Component{
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    cacheAssetsAsync({
      images: [
        require('./assets/images/expo-wordmark.png'),
        require('./assets/icons/logo.png'),
        require('./assets/images/expo-icon@2x.png'),
        require('./assets/icons/cr.png'),
        require('./assets/icons/ex.png'),
        require('./node_modules/react-navigation/src/views/assets/back-icon.png'),
        require('./assets/images/Ap.png'),
        require('./assets/images/An.png'),
        require('./assets/images/ABp.png'),
        require('./assets/images/ABn.png'),
        require('./assets/images/On.png'),
        require('./assets/images/Op.png'),
        require('./assets/images/Bp.png'),
        require('./assets/images/Bn.png'),
        require('./assets/images/refresh.png'),
        require('./assets/images/envelope.png'),
        require('./assets/images/camera.png'),
        require('./assets/icons/check.png'),
        require('./assets/icons/uncheck.png'),
        require('./assets/images/addRequest.png'),
        require('./assets/images/cm.png'),
      ],
      fonts: [
        FontAwesome.font,
        { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        { 'CmPrasanmit': require('./assets/fonts/CmPrasanmit.ttf') },
        {  'CmPrasanmitBold': require('./assets/fonts/CmPrasanmitBold.ttf') },
      ],
    })
    .then(() => {
      this.setState({ appIsReady: true });
    })
    .catch(( error ) => {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(error.message);
    })
  }

  render() {

    if (this.state.appIsReady) {
      return <Stack/>
    } else {
      return <Expo.AppLoading />
    }
  }
}



/*class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

class Chat2Screen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy 2',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy 2</Text>
        <Text>Chat with Lucy 2</Text>
      </View>
    );
  }
}

class MainScreen extends React.Component {
  render(){
    const App = StackNavigator({
      Chat: {screen: ChatScreen},
    });
    return(
      <App/>
    );
  }

}

class SetupScreen extends React.Component {
  
  render(){
    const App = StackNavigator({
      Chat: {screen: Chat2Screen},
    });
    return(
      <App/>
    );
  }
}

const BasicApp = TabNavigator(
  {
    Main: {screen: MainScreen},
    Setup: {screen: SetupScreen},
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
    },
    TabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
  }
);

export default () => <BasicApp  />;*/