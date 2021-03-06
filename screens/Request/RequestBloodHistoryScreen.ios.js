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
  Modal
} from 'react-native';
import { Font } from 'expo'
import { NavigationActions } from 'react-navigation'
import { TestButton, NavigatorBackground,ExNavigationState,CardHistoryRequest,Loading} from '../../components/common';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import RequestBloodScreen from './RequestBloodScreen';
import axios from 'axios';
import addressServer from '../../utilities/addressServer';
import { CmPrasanmitText } from '../../components/CmPrasanmitText'
import { CmPrasanmitBoldText } from '../../components/CmPrasanmitBoldText'

class ButtonRequest extends Component {
    _handlePress = () => {
        const { navigate } = this.props.navigation;
        navigate('RequestForm', { onSelect: this.props.navigation.state.params.onSelect})
    };
    render(){
        return(
            <TouchableOpacity 
                onPress={this._handlePress}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 10, paddingTop: 1,}}
            >
                <Image
                    source={require('../../assets/images/addRequest.png')}
                    style={{ width: 30, height: 30 ,marginRight:10,marginBottom:5}}
                />
            </TouchableOpacity>
        );
    }
}

export default class RequestBloodHistoryScreen extends Component {
    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'ขอเลือด',
            headerTintColor: Colors.tintColor,
            headerTitleStyle: [Font.style('CmPrasanmitBold'),{fontSize:29}],
            headerStyle: {backgroundColor: Colors.tabBar},
            gesturesEnabled: false,
            headerRight: <ButtonRequest navigation={navigation} />,
            tabBarVisible: false
        }
    };

    state = {
        history: [],
        token: '',
        test_ajax: '',
        loading : false ,
        listen : false,
        listen_Request : false
    }

    componentWillMount() {
        this.props.navigation.setParams({ title: 'Hello',onSelect: this._update })
        AsyncStorage.getItem('@loginData:key')
        .then((loginStatus) => {
            const temp = JSON.parse(loginStatus)
            this.state.token = temp.token
            console.log(addressServer.APIRequest + '/api/req');
            const api = addressServer.APIRequest + '/api/req';
            axios(api,{ 
                method: 'get', 
                headers: {'Authorization' : 'Bearer ' + this.state.token},
            })
                .then(response => {
                    //console.log(response.data)
                    this.state.history = response.data
                    this.setState({ history: response.data , loading : true})
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }

    renderHistory() {
        //console.log(this.state.history.length )
        if(this.state.history.length === 0){
            return (
                <View style={{justifyContent:'center',marginTop:10,width:310,height:80,borderWidth:1,borderColor:Colors.tabBar,borderRadius:5}}>
                    <CmPrasanmitText style={{marginLeft:15,fontSize:22,color:'#575757'}}>ไม่มีรายการการขอเลือดของคุณ หากต้อง</CmPrasanmitText>
                    <View style = {{flexDirection:'row'}}>
                        <CmPrasanmitText style={{marginLeft:15,fontSize:22,color:'#575757'}}>การจะชอเลือด กดปุ่ม </CmPrasanmitText>
                        <Image
                            source={require('../../assets/images/addRequest.png')}
                            style={{marginTop:6,width: 15, height: 15 ,marginRight:10,marginBottom:5}}
                        />
                    </View>
                </View>
            )
        } else {
            return this.state.history.map((history) => {
                //console.log(history.updated_at)
                //console.log(history.updated_at.split(' ')[0])
                var date = history.updated_at.split(' ')[0]
                date = date.split('-')
                var dateTime = new Date(date[1] + '/' + date[2] + '/' + date[0])
                var status
                var temp_time = Math.floor( ((dateTime.getTime() + (86400000*4)) - (new Date().getTime()))/(86400000)) 
                //( temp_time < 4 ) ? status = temp_time : status = history.patient_status
                //console.log(history.patient_status)
                if( temp_time > 0 && history.patient_status === 'not complete'){
                    status = temp_time
                } else if ( temp_time < 1 && history.patient_status === 'not complete' ){
                    status = 'refresh'
                } else {
                    status = history.patient_status
                }
                //console.log(date[1] + '/' + date[2] + '/' + date[0])
                //console.log( Math.floor((new Date().getTime() - dateTime.getTime())/(86400000)))
                return (
                    <CardHistoryRequest
                        key={history.id}
                        blood = {history.patient_blood}
                        bloodType = {history.patient_blood_type}
                        name = {history.patient_name}
                        hospital = {history.patient_hos}
                        status = { status }
                        onPress={() => this.goTodetail(history.id) }
                    /> 
                )}
            )
        }
    }

    _update = data => {
        this.setState({listen : data})
        console.log(addressServer.APIRequest + '/api/req')
        const api = addressServer.APIRequest + '/api/req'
        axios(api,{ 
            method: 'get', 
            headers: {'Authorization' : 'Bearer ' + this.state.token},
        })
        .then(response => {
            console.log(response.data)
            this.setState({ history: response.data })
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }

    goTodetail(detail_id) {
        this.props.navigation.navigate('RequestDetail', {params: detail_id, onSelect: this._update})
    }
    

    render() {
        return !this.state.loading ?  <Loading/> : (
            <ScrollView style={{flex: 1,backgroundColor:'white'}}> 
                <View style={[styles.center, {paddingTop:16}]}>
                    {this.renderHistory()}
                    <View style={{height:20}}></View>
                </View> 
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center'
    },
});




