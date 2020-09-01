import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
  },
});

class EachPage extends Component {
  render() {
    const {
      page: { word, def, eg, cf },
      setState,
    } = this.props;

    const inputs = [
      { title: 'Word', setState: word => setState({ word }), value: word },
      {
        title: 'Definition',
        setState: def => setState({ def }),
        value: def,
      },
      { title: 'Example', setState: eg => setState({ eg }), value: eg },
      { title: 'cf', setState: cf => setState({ cf }), value: cf },
    ];

    return (
      <View>
        {inputs.map(input => (
          <View style={style.inputContainer}>
            <Text>{input.title}</Text>
            <TextInput onChangeText={input.setState} value={input.value} />
          </View>
        ))}
      </View>
    );
  }
}

export default EachPage;
