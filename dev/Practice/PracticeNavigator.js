import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import Ikeda from './PracticeI';
import Kochiya from './PracticeK';
import Suzuki from './PracticeS';
import Okuda from './PracticeO';

const PracticeNavigator = createSwitchNavigator({
  ikeda: Ikeda,
  kochiya: Kochiya,
  suzuki: Suzuki,
  okuda: Okuda,
});

const appContainer = createAppContainer(PracticeNavigator);

export default appContainer;
