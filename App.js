import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ControlPanel from './dev/ControlPanel';
import Demo from './dev/Demo';

import Nav from './src/nav/Nav';

import { Functions } from './src/config/Const';

// --------------------------------------------

// import PracticeNav from './dev/Practice/PracticeNavigator';

// --------------------------------------------

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
          {/* <Demo /> */}
          {/* <PracticeNav /> */}
          <Nav />
        </View>
        <ControlPanel />
      </View>
    );
  }
}
