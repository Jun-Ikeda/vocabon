import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { View } from 'react-native-animatable';
import Color from '../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: { color: Color.font1 },
  titleContainer: {
    flex: 1,
  },
});

class Item extends Component {
  render() {
    const { title, onPress, titleStyle, containerStyle } = this.props;
    try {
      return (
        <TouchableOpacity
          style={[style.container, containerStyle]}
          onPress={onPress}
        >
          {this.renderLeft()}
          <View style={style.titleContainer}>
            <Text style={[style.title, titleStyle]}>{title}</Text>
          </View>
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
  };

  renderRight = () => {
    const { renderRight } = this.props;
    try {
      return renderRight();
    } catch (error) {
      return null;
    }
  };
}

export default Item;
