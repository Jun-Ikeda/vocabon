import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import Color from '../../../../../config/Color';

// import Icon from '../../../../../components/Icon';

import Gesture from '../../Gesture';
import TopHeader from '../../TopHeader';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Setting extends Component {
  render() {
    return (
      <Gesture>
        <TopHeader title="Setting" />
        <View style={style.container} pointerEvents="box-none">
          <View>
            <Text style={{ color: 'white' }}>Setting</Text>
          </View>
        </View>
      </Gesture>
    );
  }
}
