// import React, { Component } from 'react';
// import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Learn from './screens/home/Learn';
import DeckMenu from './screens/DeckMenu';

const StackNavigator = createStackNavigator(
  {
    learn: { screen: Learn },
    deckmenu: { screen: DeckMenu },
  },
  {
    headerMode: 'none',
    transparentCard: true,
  },
);

const AppContainer = createAppContainer(StackNavigator);

/* class LearnNav extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer />
      </View>
    );
  }
} */

export default AppContainer;
