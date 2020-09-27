import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../../../../../../../../../components/Icon';

const style = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
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
    return (
      <View style={style.buttonContainer}>
        {this.renderBar()}
      </View>
    );
  }

  renderBar = () => {
    const { isFront } = this.props;
    if (isFront) {
      return this.renderFlipButton();
    }
    return this.renderSwipeButtons();
  };

  renderFlipButton = () => {
    const { onPress, isFront } = this.props;
    return (
      <TouchableOpacity onPress={() => {
        onPress();
        console.log(isFront);
      }}
      >
        <Text>a</Text>
      </TouchableOpacity>
    );
  }

  renderSwipeButtons = () => {
    const { onPressLeft, onPressCenter, onPressRight } = this.props;
    const buttons = [
      {
        collection: 'Entypo',
        name: 'cross',
        onPress: () => onPressLeft(),
      },
      {
        collection: 'AntDesign',
        name: 'back',
        onPress: () => onPressCenter(),
      },
      {
        collection: 'Entypo',
        name: 'check',
        onPress: () => onPressRight(),
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
}
