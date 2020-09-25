import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class PageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderTextInputs()}
      </View>
    );
  }

  componentDidMount() {
    const { setStateInputs, card } = this.props;
    setStateInputs({ texttest: card });
  }

    renderTextInputs = () => {
      const {
        page: { word, def, eg, syn, ant, cf },
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
        { title: 'Synonym', setState: syn => setState({ syn }), value: syn },
        { title: 'Antonyms', setState: ant => setState({ ant }), value: ant },
        { title: 'cf', setState: cf => setState({ cf }), value: cf },
      ];
      return inputs.map(input => (
        <View style={style.inputContainer}>
          <Text>{input.title}</Text>
          <TextInput onChangeText={input.setState} value={input.value} />
        </View>
      ));
    }
}
