import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Okuda extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>I'm Yuto Okuda</Text>
        <Text>I highly dislike awkward programming terms</Text>
        <TouchableOpacity onPress={this.gotoIkeda}>
          <Text>Go to Ikeda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  gotoIkeda = () => {
    const { navigation } = this.props;
    navigation.navigate('ikeda');
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default Okuda;
