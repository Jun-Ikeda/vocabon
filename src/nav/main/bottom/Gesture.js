import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import { StyleConst } from '../../../config/Const';

import { bottomRef } from './BottomNav';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  gesture: {
    ...StyleConst.absoluteFullScreen,
    backgroundColor: 'transparent',
  },
});

export default class Gesture extends Component {
  render() {
    const { children } = this.props;
    return (
      <View style={style.container}>
        <GestureRecognizer
          onSwipeLeft={this.OnSwipeLeft}
          onSwipeRight={this.OnSwipeRight}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          style={style.gesture}
        />
        {children}
      </View>
    );
  }

  OnSwipeLeft = () => {
    try {
      bottomRef.OnSwipeLeft();
    } catch (error) {
      console.log(error);
    }
  };

  OnSwipeRight = () => {
    try {
      bottomRef.OnSwipeRight();
    } catch (error) {
      console.log(error);
    }
  };
}
