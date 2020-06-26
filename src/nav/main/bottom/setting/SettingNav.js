// import React, { Component } from 'react';
// import { View } from 'react-native';
// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import Template from '../../../../Template';

// import Background from '../Background';

import Setting from './screens/Setting';

const StackNavigator = createStackNavigator(
  {
    setting: { screen: Setting },
  },
  {
    headerMode: 'none',
    transparentCard: true,
  },
);

export default StackNavigator;

/* const AppContainer = createAppContainer(StackNavigator);

export default class LearnNav extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer />
      </View>
    );
  }
} */
