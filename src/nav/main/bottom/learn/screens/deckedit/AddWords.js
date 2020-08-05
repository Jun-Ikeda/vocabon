import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../../../../../components/Header';
import Icon from '../../../../../../components/Icon';
import Color from '../../../../../../config/Color';
import { TextInput } from 'react-native-gesture-handler';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
  },
});

class AddWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      def: '',
      eg: '',
      cf: '',
    };
  }

  UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    const {} = this.state;
  }

  render() {
    const { navigation } = this.props;
    const { word, def, eg, cf } = this.state;
    return (
      <View style={style.container}>
        <Header
          renderLeft={() => <Icon.Ionicons name="ios-arrow-back" />}
          onPressLeft={() => navigation.goBack()}
          renderTitle={() => <Text>Add Words</Text>}
        />
        <TextInput
          onChangeText={word => this.setState({ word })}
          value={word}
        />
        <TextInput onChangeText={def => this.setState({ def })} value={def} />
        <TextInput onChangeText={eg => this.setState({ eg })} value={eg} />
        <TextInput onChangeText={cf => this.setState({ cf })} value={cf} />
      </View>
    );
  }
}

export default AddWords;
