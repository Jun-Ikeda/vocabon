import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from '../Icon';
import Color from '../../config/Color';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: Color.font1,
  },
  title: { color: Color.font1 },
});

class ItemWithIcon extends Component {
  render() {
    const { title, onPress, containerStyle, textStyle } = this.props;
    try {
      return (
        <TouchableOpacity
          style={[style.container, containerStyle]}
          onPress={onPress}
        >
          {this.renderIcon()}
          <Text style={[style.title, textStyle]}>{title}</Text>
        </TouchableOpacity>
      );
    } catch (error) {
      return null;
    }
  }

  renderIcon = () => {
    const { icon } = this.props;
    const { collection, name, style } = icon;
    const IconProps = Icon[collection];
    return <IconProps name={name} style={style} />;
  };
}

export default ItemWithIcon;
// 使ったところ：Deckedit,SettingItem
