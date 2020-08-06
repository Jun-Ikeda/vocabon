import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../../../../components/Header';
import Icon from '../../../../../../components/Icon';
import Color from '../../../../../../config/Color';
// import { TextInput } from 'react-native-gesture-handler';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
  },
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    borderWidth: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
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
      bundle: []
    };
  }

  UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    const {} = this.state;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        <Header
          renderLeft={() => (
            <Icon.Ionicons name="ios-arrow-back" style={style.headerIcon} />
          )}
          onPressLeft={() => navigation.goBack()}
          renderTitle={() => <Text>Add Words</Text>}
        />
        {this.renderTextInputs()}
        {this.renderButtons()}
      </View>
    );
  }

  renderTextInputs = () => {
    const { word, def, eg, cf } = this.state;
    const inputs = [
      { title: 'Word', setState: word => this.setState({ word }), value: word },
      {
        title: 'Definition',
        setState: def => this.setState({ def }),
        value: def,
      },
      { title: 'Example', setState: eg => this.setState({ eg }), value: eg },
      { title: 'cf', setState: cf => this.setState({ cf }), value: cf },
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
  };

  renderButtons = () => {
    const buttons = [
      { title: 'Save', onPress: () => console.log('save') },
      { title: 'Next', onPress: () => console.log('next') },
    ];
    return (
      <View style={style.buttonsContainer}>
        {buttons.map(button => (
          <TouchableOpacity onPress={button.onPress} style={style.button}>
            <Text>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
}

export default AddWords;
