import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import Color from '../../../../../config/Color';
import Icon from '../../../../../components/Icon';

import Gesture from '../../Gesture';
import TopHeader from '../../TopHeader';

import SettingItem from './SettingItem';
import Color from '../../../../../config/Color';
import { Functions } from '../../../../../config/Const';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
  },
  buttonIcon: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: Color.background1,
  },
  itemsContainer: {
    flex: 1,
    // alignSelf: 'center',
    marginVertical: 50,
    marginHorizontal: 30,
    // aspectRatio: 1.5,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: { height: 0, width: 0 },
    };
  }

  render() {
    const { layout } = this.state;
    const { navigation } = this.props;
    return (
      <Gesture>
        <TopHeader title="Setting" />
        <View
          style={style.container}
          pointerEvents="box-none"
          onLayout={e => {
            this.setState({ layout: Functions.onLayoutContainer(e) });
          }}
        >
          <View style={style.itemsContainer}>
            <SettingItem
              title="Account"
              renderIcon={() => (
                <Icon.Ionicons name="ios-person" style={style.buttonIcon} />
              )}
              onPress={() => navigation.navigate('account')}
              layout={layout}
            />
            <SettingItem
              title="TestElement"
              renderIcon={() => (
                <Icon.AntDesign name="frown" style={style.buttonIcon} />
              )}
              onPress={() => navigation.navigate('testelement')}
              layout={layout}
            />
          </View>
        </View>
      </Gesture>
    );
  }
}

/*
dkaoajfio(1, 4, 5)
dkaoajfio(3 ,2 ,4)
*/
