import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
  },
});

class Kochiya extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>I am Junsei Kochiya.</Text>
        <Text>I am four days younger than Mr.Ikeda.</Text>
        <TouchableOpacity onPress={this.gotoSuzuki}>
          <Text>Go to Suzuki</Text>
        </TouchableOpacity>
      </View>
    );
  }

  gotoSuzuki = () => {
    // this.props.navigation.navigate('ikeda')  本来これでナビゲートするが、eslintに怒られる

    const { navigation } = this.props;
    // まずnavigationを取り出す。

    navigation.navigate('suzuki');
    // そのあとでnavigation.navigate()をする。
    // こうすることで、二回目以降もnavigation.navigate()で済む。
  }
}


export default Kochiya;
