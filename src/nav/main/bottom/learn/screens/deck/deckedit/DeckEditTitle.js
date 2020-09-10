import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Color from '../../../../../../../config/Color';

import Header from '../../../../../../../components/header/Header';
import Icon from '../../../../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'space-between',
  },
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
  textBox: {
    alignItems: 'center',
    // justifyContent: 'center',
    // borderColor: 'transparent',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    // justifyContent: 'center',
    backgroundColor: 'yellow',
    width: 50,
    height: 20,
  },
  input: {

  }
});

class DeckInfoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    const { navigation } = this.props;
    const { title } = this.state;
    return (
      <View style={style.container}>
        <Header
          renderLeft={() => (
            <Icon.Ionicons name="ios-arrow-back" style={style.headerIcon} />
          )}
          renderTitle={() => <Text>Title</Text>}
          onPressLeft={() => navigation.goBack()}
        />
        <View style={style.textBox}>
          <TextInput
            style={style.input}
            value={title}
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View>
          <TouchableOpacity onPress={this.save} style={style.button}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  save = () => {
    const { title } = this.state;
    const { navigation } = this.props;
    const updateDeckInfo = navigation.getParam('updateDeckInfo');
    updateDeckInfo({ ti: title });
    navigation.goBack();
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ title: navigation.getParam('ti') });
  }
}

export default DeckInfoInput;
