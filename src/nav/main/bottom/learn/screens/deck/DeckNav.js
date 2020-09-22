// import { createAppContainer } from 'react-navigation';
// import {
//   createStackNavigator,
//   TransitionPresets,
// } from 'react-navigation-stack';

import Menu from './screens/menu/Menu';
import Play from './screens/play/Play';
import Property from './screens/property/Property';
import Edit from './screens/edit/Edit';
import Bookmark from './screens/bookmark/Bookmark';
import Import from './screens/import/Import';
import Export from './screens/export/Export';
import Duplicate from './screens/duplicate/Duplicate';
import Share from './screens/share/Share';
import Test from './screens/test/Test';
import Analyze from './screens/analyze/Analyze';
import Delete from './screens/delete/Delete';

// const StackNavigator = createStackNavigator(
//   {
//     menu: { screen: Menu },
//     play: { screen: Play },
//     property: { screen: Property },
//     edit: { screen: Edit },
//     bookmark: { screen: Bookmark },
//     import: { screen: Import },
//     export: { screen: Export },
//     duplicate: { screen: Duplicate },
//     share: { screen: Share },
//     test: { screen: Test },
//     analyze: { screen: Analyze },
//     delete: { screen: Delete },
//   },
//   {
//     headerMode: 'none',
//     transparentCard: true,
//     defaultNavigationOptions: {
//       ...TransitionPresets.RevealFromBottomAndroid,
//     },
//   },
// );

// const AppContainer = createAppContainer(StackNavigator);

// export default AppContainer;

export default {
  menu: { screen: Menu },
  play: { screen: Play },
  property: { screen: Property },
  edit: { screen: Edit },
  bookmark: { screen: Bookmark },
  import: { screen: Import },
  export: { screen: Export },
  duplicate: { screen: Duplicate },
  share: { screen: Share },
  test: { screen: Test },
  analyze: { screen: Analyze },
  delete: { screen: Delete },
};
