import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Item from '../src/components/item/Item';
import ItemWithIcon from '../src/components/item/ItemWithIcon';
import ItemWithDescriptionRight from '../src/components/item/ItemWithDescriptionRight';
// import SettingItem from '../src/components/item/material/SettingItem';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  render() {
    return <View style={style.container}>{this.renderItemComponent()}</View>;
  }

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
