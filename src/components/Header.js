import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { HeaderConst } from '../config/Const';

const style = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    // position: 'absolute',
    top: 0,
  },
  padding: {
    paddingTop: HeaderConst.paddingTopByOS(),
  },
  headerContainer: {
    flexDirection: 'row',
  },
  left: {
    // backgroundColor: 'red',
    // width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    // backgroundColor: 'blue',
    // width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Header extends Component {
  /* static defaultProps = {
    onPressLeft: () => console.log('onPressLeft is called'),
    onPressTitle: () => console.log('onPressTitle is called'),
    onPressRight: () => console.log('onPressRight is called'),
    renderAll: () => (
      <View
        style={[
          style.headerContainer,
          {
            height:
              HeaderConst.heightMin,
          },
        ]}>
        <TouchableOpacity style={style.left} onPress={this.props.onPressLeft}>
          {this.props.renderLeft()}
        </TouchableOpacity>
        <TouchableOpacity style={style.title} onPress={this.props.onPressTitle}>
          {this.props.onPressTitle()}
        </TouchableOpacity>
        <TouchableOpacity style={style.right} onPress={this.props.onPressRight}>
          {this.props.renderRight()}
        </TouchableOpacity>
      </View>
    ),
  }; */
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
            ]}
            onPress={onPressLeft}
            pointerEvents={onPressLeft || onLongPressLeft ? 'box-none' : 'none'}
            onLongPress={onLongPressLeft}
          >
            {this.renderComponents('left')}
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.title, titleStyle]}
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

  renderComponents = part => {
    // const { renderLeft, renderTitle, renderRight } = this.props;
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
    // let renderFunction;
    // try {
    //   switch (part) {
    //     case 'left':
    //       renderFunction = this.props.renderLeft;
    //       break;
    //     case 'title':
    //       renderFunction = this.props.renderTitle;
    //       break;
    //     case 'right':
    //       renderFunction = this.props.renderRight;
    //       break;
    //     default:
    //       renderFunction = () => <TouchableWithoutFeedback />;
    //   }
    // } catch (error) {
    //   renderFunction = () => <TouchableWithoutFeedback />;
    // }
    // return renderFunction();
  };
}
