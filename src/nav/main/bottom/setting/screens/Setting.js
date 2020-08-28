import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import Color from '../../../../../config/Color';
import Icon from '../../../../../components/Icon';

import Gesture from '../../Gesture';
import TopHeader from '../../TopHeader';

import SettingItem from './SettingItem';
import Color from '../../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  buttonIcon: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: Color.background1,
  },
});

export default class Setting extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Gesture>
        <TopHeader title="Setting" />
        <View style={style.container} pointerEvents="box-none">
          <SettingItem
            title="Account"
            renderIcon={() => (
              <Icon.Ionicons name="ios-person" style={style.buttonIcon} />
            )}
            onPress={() => navigation.navigate('account')}
          />
          <SettingItem
            title="TestElement"
            renderIcon={() => (
              <Icon.AntDesign name="frown" style={style.buttonIcon} />
            )}
            onPress={() => navigation.navigate('testelement')}
          />
          
        </View>
      </Gesture>
    );
  }
}

/*
dkaoajfio(1, 4, 5)
dkaoajfio(3 ,2 ,4)
*/
