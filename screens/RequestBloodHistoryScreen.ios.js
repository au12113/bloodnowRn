import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Button,
} from 'react-native';
import { Font } from 'expo'
  import { NavigationActions } from 'react-navigation'
import { TestButton, NavigatorBackground,ExNavigationState} from '../components/common';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

class ButtonRequest extends Component {
    _handlePress = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Profile',
      params: {},
      // navigate can have a nested navigate action that will be run inside the child router
      action: NavigationActions.navigate({ routeName: 'donor'})
    })
    this.props.navigation.dispatch(navigateAction)
            /*//const { navigate } = this.props.navigation;
            navigate('RequestBlood')*/
    };
    render() {
        return(
            <TouchableOpacity
                onPress={() => this._handlePress} //{this._handlePress}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 10, paddingTop: 1,}}
            >
                <Image
                    source={require('../assets/icons/exponent-icon.png')}
                    style={{ width: 21, height: 17 }}
                />
            </TouchableOpacity>
        );
    }
}


    _onPress = () => {
      console.log(this.props.navigation);
    }


export default class RequestBloodHistoryScreen extends Component {
    static navigationOptions= {
        title: 'ขอเลือด',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
        headerRight: <Button title="test" onPress={this._onPress} />
    };

    render() {
        return(
            <View style={{marginTop:30}}>
              <Text>Re Blood His</Text>
            </View>
        );
    }
}
