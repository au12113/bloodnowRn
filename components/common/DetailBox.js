import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo'

const DetailBox = ({label,information}) => {
  return(
    <View style={styles.underline}> 
        <Text style={[Font.style('CmPrasanmitBold'),styles.title]}>
            {label}
        </Text>
        <View style={styles.detail}>
            <Text style={[Font.style('CmPrasanmit'), styles.informationText]}>
                {information}
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  underline : {
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  detail: {
    height: 30,
    width: 310,
    backgroundColor: 'transparent',
  },
  title:{
    fontSize: 23,
    height:25,
    color: 'black',
  },
  informationText: {
    paddingLeft:10,
    fontSize: 25,
    color: 'grey'
  }
});

export { DetailBox };