import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class DeckEditContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={style.container}>
        <Text> DeckEditContent </Text>
      </View>
    );
  }
}
