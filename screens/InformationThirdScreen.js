import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Font } from 'expo'

export default class InformationThirdScreen extends Component {
    static navigationOptions =  {
        title: 'คำแนะนำ3',
        headerTintColor: 'white',
        headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
        headerStyle: {marginLeft:-250,backgroundColor: '#E84A5F'},
        gesturesEnabled: false,
    };
    render() {
        return(
            <View style={{marginTop:30}}>
                <Text>INFORMATION3 SCREEN</Text>
            </View>
        );
    }

}