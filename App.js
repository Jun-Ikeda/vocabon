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
    flex: 1,
  },
});

export default class App extends Component {
  UNSAFE_componentWillMount() {
    // renderと同じでもともとComponentに用意されている関数、renderの前に呼び出される
    console.log(Functions.getTime());
  }

  render() {
    // return <PracticeIH />;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 2 }}>
          <View style={style.container}>
            <Nav />
          </View>
          <ControlPanel />
        </View>
        {/* <View style={{ flex: 1 }}>
          <Demo />
        </View> */}
      </View>
    );
  }
}
