import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ControlPanel from './dev/ControlPanel';
import Demo from './dev/Demo';

import Nav from './src/nav/Nav';

import { Functions } from './src/config/Const';

// --------------------------------------------

// import PracticeNav from './dev/Practice/PracticeNavigator';
import PracticeIH from './dev/Practice/PracticeIH';

// --------------------------------------------

const style = StyleSheet.create({
  container: {
    flex: 2,
  },
});

export default class App extends Component {
  UNSAFE_componentWillMount() {
    console.log(Functions.getTime());
  }

  render() {
    // return <PracticeIH />;
    return (
      <View style={{ flex: 1 }}>
        <View style={style.container}>
          {/* <PracticeNav /> */}
          <Nav />
        </View>
        <ControlPanel />
        {/* <View style={{ flex: 1 }}>
          <Demo />
          <PracticeIH />
        </View> */}
      </View>
    );
  }
}
