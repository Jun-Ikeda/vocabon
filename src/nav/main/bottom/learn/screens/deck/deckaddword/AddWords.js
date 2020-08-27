import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../../../../../components/Header';
import Icon from '../../../../../../../components/Icon';
import Color from '../../../../../../../config/Color';
import Deck from '../../../../../../../config/Firebase/Deck';
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
      bundle: [],
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

    /*
    const array = [1,2,3,4]
    array.map(num => {
      console.log(num)
    })
    array.map(() => {})

    this.setState({word: 'nantyarakantyara'})
    const string = 'text messgage'
    const object = { string }
    console.log(object.string)
    ( word ) => this.setState({ word })
    testFunction = ( word ) => {
      console.log();
    }
    function testFunction(word) {
      this.setState
    }
    <TextInput onChangeText={word => this.setState({ word })} value={this.state.word} />
    */

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
    const bundleNext = () => {
      const { word, def, cf, eg, bundle } = this.state;
      bundle.push({
        word,
        def,
        cf,
        eg,
        er: 0,
        mark: [],
      });
      console.log({ bundle });
      this.setState({
        word: '',
        def: '',
        cf: '',
        eg: '',
        bundle,
      });
    };
    const bundleSave = () => {
      bundleNext();
      const { bundle } = this.state;
      const { navigation } = this.props;
      const deckid = navigation.getParam('id');
      const deckinfo = navigation.getParam('deckinfo');
      // navigation.navigate('addwords', { deckid, uri });
      const uri = deckinfo.card;
      console.log({ uri });
      Deck.Card.save({ deckid, uri, data: bundle });
      navigation.goBack();
    };
    const buttons = [
      { title: 'Save', onPress: bundleSave },
      { title: 'Next', onPress: bundleNext },
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
