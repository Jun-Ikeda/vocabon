import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';

const StackNavigator = createStackNavigator(
  {
    // usermenu: { screen: UserMenu },
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
