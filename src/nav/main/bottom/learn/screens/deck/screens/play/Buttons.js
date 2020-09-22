import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderButtons()}
      </View>
    );
  }

  renderButtons = () => {
    const buttons = [
      { title: '×', onPress: () => { } },
      { title: '', onPress: () => { } },
      { title: '〇', onPress: () => { } },
    ];
    return buttons.map(button => {
      const { title, onPress } = button;
      return (
        <TouchableOpacity onPress={onPress}>
          <Text>{title}</Text>
        </TouchableOpacity>
      );
    });
  }

  swipeLeft = () => {
    // const { swiperRef } = this.props;
    // swiperRef. @鈴木 ここどう書くんだっけ？
  }

  swipeRight = () => {
    // const { swiperRef } = this.props;
    // swiperRef. @鈴木 ここどう書くんだっけ？
  }
}
