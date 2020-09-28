import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Functions } from '../../config/Const';
import Item from '../item/Item';
import PopUpMenu from './PopUpMenu';

const style = StyleSheet.create({
  menuContainer: {
    backgroundColor: 'white',
  },
});

export default class PopUpMenuWithItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: { height: 0, width: 0 },
    };
  }

  render() {
    return (
      <PopUpMenu
        {...this.props}
        onLayout={e =>
          this.setState({ layout: Functions.onLayoutContainer(e) })
        }
        renderMenu={() => this.renderItems()}
      />
    );
  }

  renderItems = () => {
    const {
      layout: { width },
    } = this.state;
    const { menuContainerStyle } = this.props;
    const items = [
      {
        title: 'test1',
        onPress: () => {
          console.log('test1');
        },
      },
      {
        title: 'test2',
        onPress: () => {
          console.log('test2');
        },
      },
      {
        title: 'test3',
        onPress: () => {
          console.log('test3');
        },
      },
    ];
    return (
      <View
        style={[style.menuContainer, { width: width / 3 }, menuContainerStyle]}
      >
        {items.map(item => (
          <Item
            {...item}
            titleStyle={{ color: 'black', backgroundColor: 'blue', margin: 20, borderWidth: 2 }}
            containerStyle={{ flex: 0, backgroundColor: 'red' }}
          />
        ))}
      </View>
    );
  };
}
