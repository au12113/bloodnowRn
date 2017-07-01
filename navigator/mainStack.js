import React from 'react';
import Expo, { Font } from 'expo';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import RegisterScreen2 from '../screens/RegisterScreen2'
import Tab from './TabNavigator.js'

export default class Stack extends React.Component {
  render(){
    const Stack = StackNavigator(
    {
      Login : {screen: LoginScreen},
      Register : {screen: RegisterScreen},
      Register2: {screen: RegisterScreen2},
      Bloodnow : {screen: Tab},
    },{
        initialRouteName: 'Bloodnow',
        mode: 'modal',
        headerMode: 'float',
    });
    return(
      <Stack/>
    );
  }
}