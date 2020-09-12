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
    const { iconStyle } = this.props;
    return (
      <Header
        renderLeft={() => (
          <Icon.Ionicons
            name="ios-arrow-back"
            style={[style.headerIcon, iconStyle]}
          />
        )}
        renderTitle={() => this.renderTitle()}
        onPressLeft={this.goBack}
        {...this.props}
      />
    );
  }

  renderTitle = () => {
    const { renderCenter, titleStyle, title } = this.props;
    // return (
    //   <View style={{ flex: 1, backgroundColor: 'red', alignSelf: 'stretch' }} />
    // );
    try {
      return renderCenter();
      // return <View style={{ flex: 1, backgroundColor: 'red' }} />;
      // } />
    } catch (error) {
      return <Text style={[style.title, titleStyle]}>{title}</Text>;
    }
  };

  goBack = () => {
    const { navigation, onPressLeft } = this.props;
    try {
      onPressLeft();
    } catch (error) {}
    navigation.goBack();
  };
}
