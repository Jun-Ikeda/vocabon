import { createSwitchNavigator } from 'react-navigation';

import NewDeck from './screens/NewDeck';
import NewStyle from './screens/NewStyle';

export default createSwitchNavigator({
  newdeck: { screen: NewDeck },
  newstyle: { screen: NewStyle },
});
