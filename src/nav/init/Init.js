import React, { Component } from 'react';
import { View, Image } from 'react-native';

import Storage from '../../config/Storage';
// import Storage, { StateStorage } from "../config/Storage";
// import Storage, { StateStorage } from "../config/Storage";
// import initState from "../config/initState";
// import { Functions } from "../config/Const";

// import Timer from '../components/Timer';


const icon = require('../../../assets/icon.png');

export default class Init extends Component {
  // eslint-disable-next-line camelcase
  async UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    await Storage.Function.load({ key: 'isInitialized' });
    navigation.navigate('launch');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={icon}
          style={{ height: 128, width: 128, opacity: 0.2 }}
        />
      </View>
    );
  }
}
