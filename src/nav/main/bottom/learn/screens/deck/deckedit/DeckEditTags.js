import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class DeckEditTags extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    const {} = this.state;
    return (
      <View style={style.container}>
        <Text>This is DeckEditTags screen!</Text>
      </View>
    );
  }
}

export default DeckEditTags;
