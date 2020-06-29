// import React, { Component } from 'react';
// import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';

import Learn from './screens/home/Learn';
import DeckMenu from './screens/DeckMenu';
import UserMenu from './screens/UserMenu';
import DeckEdit from './screens/deckedit/DeckEdit';

const StackNavigator = createStackNavigator(
  {
    learn: { screen: Learn },
    deckmenu: { screen: DeckMenu },
    usermenu: { screen: UserMenu },
    deckedit: { screen: DeckEdit },
  },
  {
    headerMode: 'none',
    transparentCard: true,
    defaultNavigationOptions: {
      ...TransitionPresets.RevealFromBottomAndroid,
    },
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
