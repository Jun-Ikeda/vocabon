import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../../../../../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   flex: 1,
  //   justifyContent: 'space-between',
  //   alignSelf: 'center',
  // },
  icon: {
    fontSize: 30,
  },
});

export default class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={style.container}>{this.renderButtons()}</View>;
  }

  // renderButtonsContainer = () => (
  //   <View style={style.buttonContainer}>{this.renderButtons()}</View>
  // );

  renderButtons = () => {
    const { swiperRef } = this.props;
    const buttons = [
      {
        collection: 'Entypo',
        name: 'check',
        onPress: () => swiperRef.swipeLeft(),
      },
      {
        collection: 'AntDesign',
        name: 'back',
        onPress: () => swiperRef.swipeBack(swiperRef.previousCardIndex),
      },
      {
        collection: 'Entypo',
        name: 'cross',
        onPress: () => swiperRef.swipeRight(),
      },
    ];
    return buttons.map(button => {
      const { collection, name, onPress } = button;
      const IconComponent = Icon[collection];
      return (
        <TouchableOpacity onPress={onPress}>
          <IconComponent name={name} style={style.icon} />
        </TouchableOpacity>
      );
    });
  };

  swipeLeft = () => {
    // const { swiperRef } = this.props;
    // swiperRef. @鈴木 ここどう書くんだっけ？
  };

  swipeRight = () => {
    // const { swiperRef } = this.props;
    // swiperRef. @鈴木 ここどう書くんだっけ？
  };
}
