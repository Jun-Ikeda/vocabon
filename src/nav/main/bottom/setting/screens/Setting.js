import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

// import Color from '../../../../../config/Color';
import Icon from '../../../../../components/Icon';

import Gesture from '../../Gesture';
import TopHeader from '../../TopHeader';

import SettingItem from './SettingItem';
import Color from '../../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 20,
    paddingHorizontal: 50,
    color: Color.background1,
  },
  itemsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 50,
    marginHorizontal: 30,
    // borderWidth: 2,
    // borderColor: 'white',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    // borderBottomWidth: 2,
    // borderBottomColor: Color.background1,
    // borderBottomEndRadius: 50,
    // borderBottomStartRadius: 50,
  },
});

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFocused } = this.props;
    return (
      <Gesture style={{ opacity: isFocused ? 1 : 0 }}>
        <TopHeader title="Setting" />
        <View style={style.container} pointerEvents="box-none">
          <View style={style.itemsContainer}>{this.renderItem()}</View>
        </View>
      </Gesture>
    );
  }

  renderItem = () => {
    const { navigation } = this.props;
    const items = [
      {
        title: 'Account',
        icon: {
          collection: 'Ionicons',
          name: 'ios-person',
          style: style.buttonIcon,
        },
        onPress: () => navigation.navigate('account'),
      },
      {
        title: 'Notification',
        icon: {
          collection: 'Ionicons',
          name: 'md-notifications',
          style: style.buttonIcon,
        },
        onPress: () => navigation.navigate(''),
      },
      {
        title: 'Appearance',
        icon: {
          collection: 'Ionicons',
          name: 'md-eye',
          style: style.buttonIcon,
        },
        onPress: () => navigation.navigate(''),
      },
      {
        title: 'Hint',
        icon: {
          collection: 'Ionicons',
          name: 'md-information-circle',
          style: style.buttonIcon,
        },
        onPress: () => navigation.navigate(''),
      },
      {
        title: 'Help',
        icon: {
          collection: 'Ionicons',
          name: 'md-help-circle',
          style: style.buttonIcon,
        },
        onPress: () => {},
      },
    ];
    return items.map(item => (
      <View style={style.itemContainer}>
        <SettingItem {...item} />
      </View>
    ));
  };
}

export default withNavigationFocus(Setting);
