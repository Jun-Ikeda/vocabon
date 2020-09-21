import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import TagInput from 'react-native-tags-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../../../../../../../components/Icon';

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
  },
});

class EachPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: [],
      },
    };
  }

  render() {
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

    return (
      <View>
        {inputs.map(input => (
          <View style={style.inputContainer}>
            <Text>{input.title}</Text>
            <TextInput onChangeText={input.setState} value={input.value} />
          </View>
        ))}
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          leftElement={<Icon.Ionicons name="md-settings" />}
        />
        <TouchableOpacity onPress={() => console.log(this.state.tags)}>
          <Text>a</Text>
        </TouchableOpacity>
      </View>
    );
  }

  updateTagState = state => {
    this.setState({
      tags: state,
    });
  };
}

export default EachPage;