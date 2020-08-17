import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Ikeda extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>I am Jun Ikeda.</Text>
        <Text>I am probably the best React Native Programmer of us</Text>

        <TouchableOpacity onPress={this.gotoKochiya}>
          <Text>Go to Kochiya</Text>
        </TouchableOpacity>
      </View>
    );
  }

  gotoKochiya = () => {
    // this.props.navigation.navigate('kochiya') < 本来これでナビゲートできる.

    const { navigation } = this.props;
    // だけど、それだと怒られる。
    // 長いから
    // だから、まずこうやってnavigationを取り出す。

    navigation.navigate('kochiya');
    // そのあとでnavigation.navigate()をする。
    // こうすることで、何回か書く場合も、毎回this.props.navigation.navigate()という長い関数はいらなくなる。
    // 二回目以降もnavigation.navigate()で済む
  }
}

export default Ikeda;
