import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ControlPanel from './dev/ControlPanel';

import Nav from './src/nav/Nav';

import { Functions } from './src/config/Const';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  UNSAFE_componentWillMount() {
    console.log(Functions.getTime());
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={style.container}>
          <Nav />
        </View>
        <ControlPanel />
      </View>
    );
  }
}
