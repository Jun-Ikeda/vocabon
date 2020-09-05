import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemWithIcon from '../ItemWithIcon';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // height: 120,
    borderWidth: 1,
    borderColor: 'white',
  },
  iconStyle: {
    fontSize: 30,
  },
  iconContainerStyle: {
    width: 60,
    // backgroundColor: 'red',
  },
  titleStyle: {
    fontSize: 26,
  },
});

class SettingItem extends Component {
  render() {
    return (
      <ItemWithIcon
        iconStyle={style.iconStyle}
        iconContainerStyle={style.iconContainerStyle}
        titleStyle={style.titleStyle}
        {...this.props}
        containerStyle={style.container}
        // icon={{ collection: 'Ionicons', name: 'md-notifications' }}
      />
    );
  }
}

export default SettingItem;
