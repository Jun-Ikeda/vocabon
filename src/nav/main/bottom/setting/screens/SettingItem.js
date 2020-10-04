import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../../../../components/Icon';
import ItemWithIcon from '../../../../../components/item/ItemWithIcon';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    transform: [{ rotate: '180deg' }],
    fontSize: 25,
  },
  // iconContainerStyle: {
  //   width: 60,
  //   // backgroundColor: 'red',
  // },
  // titleStyle: {
  //   fontSize: 26,
  // },
});

export default class SettingItem extends Component {
  render() {
    return (
      <ItemWithIcon
        iconStyle={style.iconStyle}
        iconContainerStyle={style.iconContainerStyle}
        titleStyle={style.titleStyle}
        {...this.props}
        // containerStyle={styile.Style}
        // {...this.props}
        renderRight={() => (
          <Icon.Ionicons
            name="ios-arrow-back"
            style={style.headerIcon}
          />
        )}
      />
    );
  }
}
