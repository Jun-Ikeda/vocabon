import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../../../../../../../config/Color';
import HeaderWithBack from '../../../../../../../components/header/HeaderWithBack';

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
    const {navigation} = this.props;
    return (
      <View style={style.container}>
        <HeaderWithBack navigation={navigation} title="Edit" />
      </View>
    );
  }
}
