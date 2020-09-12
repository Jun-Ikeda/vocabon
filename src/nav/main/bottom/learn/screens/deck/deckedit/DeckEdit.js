import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../../../../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
  },
});

export default class DeckEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={style.container}>
        <Text> DeckEdit </Text>
      </View>
    );
  }
}
