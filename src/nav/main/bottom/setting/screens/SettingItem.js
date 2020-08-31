import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import ItemWithIcon from '../../../../../components/item/ItemWithIcon';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'white',
    height: 60,
  },
});

class SettingItem extends Component {
  render() {
    const { title, icon, onPress /* layout */ } = this.props;
    try {
      return (
        <ItemWithIcon
          title={title}
          onPress={onPress}
          icon={icon}
          containerStyle={style.container}
        />
      );
    } catch (error) {
      return null;
    }
  }
}

/*
const dkaoajfio = (a, b, c) => {
    return (a + b) * c
}
*/

export default SettingItem;
