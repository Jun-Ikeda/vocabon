import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
  },
});

class SettingItem extends Component {
  render() {
    const { title, renderIcon, onPress /* layout */ } = this.props;
    // const responsiveStyle = {
    //   container: {
    //     // height: layout.height - 40,
    //     width: layout.width - 40,
    //   },
    // };
    try {
      return (
        <TouchableOpacity
          style={[style.container]}
          onPress={onPress}
        >
          {renderIcon()}
          <Text style={{ color: 'white' }}>{title}</Text>
        </TouchableOpacity>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

/*
const dkaoajfio = (a, b, c) => {
    return (a + b) * c
}
*/

export default SettingItem;