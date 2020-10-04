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
    const { navigation, renderItem } = this.props;
    return (
      <View style={style.container}>
        <HeaderWithBack navigation={navigation} title="Play" />
        <TouchableOpacity onPress={this.gotoNormalPlay}>
          <Text>Play</Text>
        </TouchableOpacity>
        <br />
        <Text>front is</Text>
        {this.renderItem()}
      </View>
    );
  }

  renderItem = () => {
    const items = [
      {title: 'word' },
      {title: 'meaning' },
    ];
    return items.map(item => (
      <TouchableOpacity
        onPress={() => {
          const { navigation } = this.props;
          const setState = navigation.getParam('setState');
          setState({ learn: items.title });
          navigation.goBack();
        }}
      >
        <Text style={style.container}>{item.title}</Text>
      </TouchableOpacity>
    ));
  };

  gotoNormalPlay = () => {
    const { navigation } = this.props;
    const deckinfo = navigation.getParam('deckinfo');
    navigation.navigate('normalplay', { deckinfo });
  };
}
