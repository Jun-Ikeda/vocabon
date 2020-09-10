import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import Icon from '../Icon';
import Color from '../../config/Color';

const style = StyleSheet.create({
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
  title: {
    // fontWeight: '700',
  },
});

export default class HeaderWithBack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, titleStyle, iconStyle } = this.props;
    return (
      <Header
        renderLeft={() => (
          <Icon.Ionicons
            name="ios-arrow-back"
            style={[style.headerIcon, iconStyle]}
          />
        )}
        renderTitle={() => (
          <Text style={[style.title, titleStyle]}>{title}</Text>
        )}
        onPressLeft={this.goBack}
        {...this.props}
      />
    );
  }

  goBack = () => {
    const { navigation, onPressLeft } = this.props;
    try {
      onPressLeft();
    } catch (error) {}
    navigation.goBack();
  };
}
