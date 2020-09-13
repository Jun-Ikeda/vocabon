import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { HeaderConst } from '../../config/Const';

const style = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    top: 0,
  },
  padding: {
    paddingTop: HeaderConst.paddingTopByOS(),
  },
  headerContainer: {
    flexDirection: 'row',
  },
  left: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Header extends Component {
  render() {
    const { style: propsStyle } = this.props;
    return (
      <View style={[style.container, propsStyle]}>
        <View style={style.padding} />
        {this.renderAll()}
      </View>
    );
  }

  renderAll = () => {
    const { style: propsStyle, renderAll, large } = this.props;
    const height = {
      height: large ? HeaderConst.heightMax : HeaderConst.heightMin,
    };
    try {
      return renderAll();
    } catch (error) {
      return (
        <View style={[style.headerContainer, propsStyle, height]}>
          {this.renderContent()}
        </View>
      );
    }
  };

  renderContent = () => {
    const {
      large,
      onPressLeft,
      onPressTitle,
      onPressRight,
      onLongPressLeft,
      onLongPressTitle,
      onLongPressRight,
    } = this.props;
    const width = {
      width: large ? HeaderConst.heightMax : HeaderConst.heightMin,
    };
    const parts = [
      {
        name: 'left',
        onPress: onPressLeft,
        onLongPress: onLongPressLeft,
        style: [style.left, width],
      },
      {
        name: 'title',
        onPress: onPressTitle,
        onLongPress: onLongPressTitle,
        style: style.title,
      },
      {
        name: 'right',
        onPress: onPressRight,
        onLongPress: onLongPressRight,
        style: [style.right, width],
      },
    ];
    return parts.map(part => (
      <TouchableOpacity
        style={part.style}
        onPress={part.onPress}
        onLongPress={part.onLongPress}
      >
        {this.renderComponents(part.name)}
      </TouchableOpacity>
    ));
  };

  renderComponents = part => {
    try {
      const { renderLeft, renderTitle, renderRight } = this.props;
      switch (part) {
        case 'left':
          return renderLeft();
        case 'title':
          return renderTitle();
        case 'right':
          return renderRight();
        default:
          return null;
      }
    } catch (error) {
      return null;
    }
  };
}
