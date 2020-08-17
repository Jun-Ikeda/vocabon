import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Suzuki extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>I'm Masataka Suzuki</Text>
        <Text>I'll do my best...</Text>
        <TouchableOpacity onPress={this.gotoOkuda}>
          <Text>Go to Okuda...</Text>
        </TouchableOpacity>
      </View>
    );
  }

  gotoOkuda = () => {
    const { navigation } = this.props;
    navigation.navigate('okuda');
  };
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Suzuki;
