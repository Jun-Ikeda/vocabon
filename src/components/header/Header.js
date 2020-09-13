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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
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
    const {
      style: propsStyle,
      renderAll,
      large,
      leftStyle,
      onPressLeft,
      titleStyle,
      onPressTitle,
      rightStyle,
      onPressRight,
      onLongPressLeft,
      onLongPressTitle,
      onLongPressRight,
    } = this.props;
    try {
      return renderAll();
    } catch (error) {
      return (
        <View
          style={[
            style.headerContainer,
            propsStyle,
            {
              height: large ? HeaderConst.heightMax : HeaderConst.heightMin,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              style.left,
              leftStyle,
              { width: large ? HeaderConst.heightMax : HeaderConst.heightMin },
              {
                backgroundColor: 'red',
              },
            ]}
            onPress={onPressLeft}
            pointerEvents={onPressLeft || onLongPressLeft ? 'box-none' : 'none'}
            onLongPress={onLongPressLeft}
          >
            {this.renderComponents('left')}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              style.title,
              titleStyle,
              {
                backgroundColor: 'green',
              },
            ]}
            onPress={onPressTitle}
            pointerEvents={
              onPressTitle || onLongPressTitle ? 'box-none' : 'none'
            }
            onLongPress={onLongPressTitle}
          >
            {this.renderComponents('title')}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              style.right,
              rightStyle,
              { width: large ? HeaderConst.heightMax : HeaderConst.heightMin },
              {
                backgroundColor: 'blue',
              },
            ]}
            onPress={onPressRight}
            pointerEvents={
              onPressRight || onLongPressRight ? 'box-none' : 'none'
            }
            onLongPress={onLongPressRight}
          >
            {this.renderComponents('right')}
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderContent = () => {
    const { renderLeft, renderTitle, renderRight, large } = this.props;
    const parts = [
      {
        name: 'left',
        render: renderLeft,
        style: [
          style.left,
          {
            backgroundColor: 'red',
            width: large ? HeaderConst.heightMax : HeaderConst.heightMin,
          },
        ],
      },
      {
        name: 'title',
        render: renderTitle,
        style: [style.title, { backgroundColor: 'green' }],
      },
      {
        name: 'right',
        render: renderRight,
        style: [
          style.right,
          {
            backgroundColor: 'blue',
            width: large ? HeaderConst.heightMax : HeaderConst.heightMin,
          },
        ],
      },
    ];
    // return parts.map(part => {
    //   const partStyle = {}
    //   return (
    //     try {}
    //   )
    // })
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
