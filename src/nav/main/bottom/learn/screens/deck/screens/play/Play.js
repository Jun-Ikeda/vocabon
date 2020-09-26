import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderWithBack from '../../../../../../../../components/header/HeaderWithBack';
import Color from '../../../../../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
  },
});

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        <HeaderWithBack navigation={navigation} title="Play" />
        <TouchableOpacity onPress={this.gotoNormalPlay}>
          <Text>Play</Text>
        </TouchableOpacity>
      </View>
    );
  }

  gotoNormalPlay = () => {
    const { navigation } = this.props;
    const deckinfo = navigation.getParam('deckinfo');
    navigation.navigate('normalplay', { deckinfo });
  };
}
