import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemWithIcon from '../../../../../../../components/item/ItemWithIcon';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class DeckEditItem extends Component {
  render() {
    const { descriptionBelow, descBStyle, BelowStyle } = this.props;
    return (
      <View style={style.container}>
        <ItemWithIcon
          {...this.props}
          renderBelow={() => (
            <View style={BelowStyle}>
              <Text style={descBStyle}>{descriptionBelow}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default DeckEditItem;

// このcomponentを使う時に必要なprops一覧
// Itemより
//     title
//     titleStyle
//     onPress
//     containerStyle
//     renderLeft
//     renderRight
//     renderBelow
// ItemWithIconより
//     icon{
//       collection
//       name
//     }
//     iconContainerStyle
//     iconStyle
// DeckEditItemより
//     descriptionBelow(renderBelowにDeckEditItemで代入されてる)
//     descBStyle
//     BelowStyle
