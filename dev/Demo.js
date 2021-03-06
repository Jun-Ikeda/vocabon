import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Item from '../src/components/item/Item';
import ItemWithIcon from '../src/components/item/ItemWithIcon';
import ItemWithDescriptionRight from '../src/components/item/ItemWithDescriptionRight';
// import SettingItem from '../src/components/item/material/SettingItem';
import PopUpMenu from '../src/components/menu/PopUpMenu';
import Color from '../src/config/Color';
import PopUpMenuWithItems from '../src/components/menu/PopUpMenuWithItems';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  item: {
    borderWidth: 1,
    borderColor: 'white',
  },
  itemwithicon: {
    borderWidth: 1,
    borderColor: 'white',
  },
  itemdescription: {
    borderWidth: 1,
    borderColor: 'white',
  },
});

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
    };
  }

  render() {
    return <View style={style.container}>{this.renderPopUpMenu()}</View>;
  }

  renderPopUpMenu = () => {
    const { menuVisible } = this.state;
    return (
      <View style={{ flex: 1 /* , backgroundColor: 'purple' */ }}>
        <TouchableOpacity onPress={() => this.setState({ menuVisible: true })}>
          <Text>a</Text>
        </TouchableOpacity>
        <PopUpMenuWithItems
          isVisible={menuVisible}
          setVisible={bool => this.setState({ menuVisible: bool })}
          overlayStyle={{ backgroundColor: Color.background3 }}
          items={[
            {
              title: 'test1',
              onPress: () => {
                console.log('test1');
              },
            },
            {
              title: 'test2aaaaaaaaaaaaaa',
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
          ]}
          // renderMenu={() => (<TouchableOpacity onPress={() => console.log('test')} style={{ height: 200, width: 150, backgroundColor: 'white' }}><Text>Contents</Text></TouchableOpacity>)}
        />
      </View>
    );
  };

  // renderKeyCode = () => <textarea onKeyDown={e => props.onKeyDown(e)} />;

  renderItemComponent = () => (
    <View style={{ flex: 1 }}>
      <Item
        title="Item"
        containerStyle={style.item}
        onPress={() => console.log('aaa')}
      />
      <ItemWithIcon
        title="ItemWithIcon"
        containerStyle={style.itemwithicon}
        icon={{ collection: 'Ionicons', name: 'ios-arrow-back' }}
      />
      <ItemWithDescriptionRight
        title="ItemWithDescriptionRight"
        containerStyle={style.itemdescription}
        description="description"
      />
      {/* <SettingItem
        title="SettingItem"
        icon={{ collection: 'Ionicons', name: 'md-notifications' }}
      /> */}
    </View>
  );
}

export default Demo;
