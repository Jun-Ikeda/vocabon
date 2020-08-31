import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { StyleConst } from '../config/Const';

const style = StyleSheet.create({
  container: {
    ...StyleConst.absoluteFullScreen,
  },
  overlay: {
    ...StyleConst.absoluteFullScreen,
  },
});

export default class Background extends Component {
  render() {
    const { imageStyle, imageSource, blurRadius, overlayStyle } = this.props;
    return (
      <View style={style.container}>
        <Image
          style={[style.image, imageStyle]}
          source={imageSource}
          blurRadius={blurRadius}
        />
        <View style={[style.overlay, overlayStyle]} />
      </View>
    );
  }
}
