import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';

import Learn from './screens/Learn';

const StackNavigator = createStackNavigator(
  {
    learn: { screen: Learn },
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

export default AppContainer;
