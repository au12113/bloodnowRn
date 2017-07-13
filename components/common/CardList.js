import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet,ActivityIndicator } from 'react-native';
import axios from 'axios';
import Colors from '../../constants/Colors';
import { NavigationActions } from 'react-navigation'
import { CmPrasanmitText } from '../CmPrasanmitText'
import { CmPrasanmitBoldText } from '../CmPrasanmitBoldText'
import { DonateHistoryCard } from './DonateHistoryCard';

export class CardList extends Component{

  state = {
    list: [],
    loading: false
  }

  componentWillMount() {
    axios.get(this.props.url)
    .then(response => this.setState({ list: response.data,loading: true }));
  }

  renderList() {
    //console.log(this.state.list)
     return this.state.list.map(list =>
       <CardDetail
         key = {list.title}
         list = {list}
         visible = {true}
         onPress = {this._Test}
       />
       //<CardDetail key={list.title} list={list} visible={true}/>
     );
   }

   _Test = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Profile'}) ,
        NavigationActions.navigate({ routeName: 'DonateHistory'})
      ]
    })
    this.props.navi.dispatch(resetAction)
   }

  render() {
    if(this.state.loading) {
      return(
        <ScrollView style={styles.requestListContainerStyle}>
          {this.renderList()}
        </ScrollView>
        /* <ScrollView style={styles.requestListContainerStyle}>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#DCDCDC',}}>
          <View style={[styles.requestCardContainerStyle,{marginLeft:28,justifyContent: 'center'}]}>
            <CmPrasanmitText style={{fontSize:22,color:'#575757'}}> ไม่มีรายการการให้เลือด</CmPrasanmitText>
          </View>
        </View>
        </ScrollView> */
      )
    }
    return (
      <ScrollView style={styles.requestListContainerStyle}>
        <ActivityIndicator style={{alignSelf:'center'}} size="large" />
      </ScrollView>
    )
  }
}

const CardDetail = ({ list, onPress, visible, gropBlood }) => {
  if(visible){
    return(
      <View style={{borderBottomWidth: 1, borderBottomColor: '#DCDCDC',}}>
      <TouchableOpacity onPress={onPress} style={styles.requestCardContainerStyle} >
        <View style={{height:78,backgroundColor:'white',flexDirection:'row'}}>
          <View style={{flex:19,alignItems: 'center',justifyContent: 'center',}}>
            <Image
              style={styles.imageRequestStyle}
              source={{ uri: 'http://images.boomsbeat.com/data/images/full/6954/tayl-png.png' }}
            />
            <View style={{height:15,width:30,position:'absolute',bottom:12,left:18,backgroundColor:Colors.tabBar,borderRadius:15,alignItems: 'center',justifyContent:'center'}}>
              <CmPrasanmitBoldText style={{fontSize:14,color:'white',backgroundColor:'transparent'}}>A+</CmPrasanmitBoldText>
            </View>
          </View>
          <View style={{flex:35,justifyContent: 'center',}}>
            <CmPrasanmitBoldText style={{fontSize:22,color:'#575757'}}>Lautner</CmPrasanmitBoldText>
          </View>
          <View style={{flex:14,marginRight:10,alignItems: 'center',justifyContent: 'center'}}>
            <CmPrasanmitText style={{fontSize:18,color:'#575757'}}>รายละเอียด</CmPrasanmitText>
          </View>
        </View>
      </TouchableOpacity>
      </View>
    );
  } else {
    return <View />
  }
}

const styles = StyleSheet.create({
  requestCardContainerStyle: {
    height: 78,
    width: 340,
    flexDirection: 'column',
    flex:1
    //alignItems: 'center',
  },
  imageRequestStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth:0.1,
    borderColor: '#575757'
  },
  detailRequestStyle: {
    paddingLeft: 20,
  },
  requestListContainerStyle: {
    marginTop:15,
    height: 250,
    alignSelf: 'center',
    width: 340,
    backgroundColor:'white'
  },
});
