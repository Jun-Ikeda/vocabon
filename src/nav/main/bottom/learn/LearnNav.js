// import React, { Component } from 'react';
// import { View } from 'reat-native';
import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';

import Learn from './screens/home/Learn';
import DeckMenu from './screens/deck/DeckMenu';
import UserMenu from './screens/UserMenu';
import DeckProperty from './screens/deck/deckproperty/DeckProperty';
import DeckPropertyTitle from './screens/deck/deckproperty/DeckPropertyTitle';
import DeckEdit from './screens/deck/deckedit/DeckEdit';
import DeckPlay from './screens/deck/deckplay/DeckPlay';
import Search from './screens/search/Search';

const StackNavigator = createStackNavigator(
  {
    learn: { screen: Learn },
    deckmenu: { screen: DeckMenu },
    usermenu: { screen: UserMenu },
    deckproperty: { screen: DeckProperty },
    deckpropertytitle: { screen: DeckPropertyTitle },
    deckedit: { screen: DeckEdit },
    // addwords: { screen: AddWords },
    deckplay: { screen: DeckPlay },
    search: { screen: Search },
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
