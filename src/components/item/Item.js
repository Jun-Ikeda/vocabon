import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Color from '../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: { color: Color.font1 },
});

class Item extends Component {
  render() {
    const { title, onPress, textStyle, containerStyle } = this.props;
    try {
      return (
        <TouchableOpacity
          style={[style.container, containerStyle]}
          onPress={onPress}
        >
          <Text style={[style.title, textStyle]}>{title}</Text>
        </TouchableOpacity>
      );
    } catch (error) {
      return null;
    }
  }
}

export default Item;
