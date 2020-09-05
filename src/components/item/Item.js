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
          {this.renderLeft()}
          <Text style={[style.title, textStyle]}>{title}</Text>
          {this.renderRight()}
        </TouchableOpacity>
      );
    } catch (error) {
      return null;
    }
  }

  renderLeft = () => {
    const { renderLeft } = this.props;
    try {
      return renderLeft();
    } catch (error) {
      return null;
    }
  }

  renderRight = () => {
    const { renderRight } = this.props;
    try {
      return renderRight();
    } catch (error) {
      return null;
    }
  }
}

export default Item;
