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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    // borderColor: 'transparent',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  buttonText: {
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  input: {},
  content: {
    height: 280,
    marginHorizontal: 20,
    backgroundColor: 'red',
  },
});

class DeckPropertyTitle extends Component {
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
        <View style={{ flex: 1, backgroundColor: 'black' }} />
        <View style={{ flex: 2 }}>
          <View style={style.textBox}>
            <TextInput
              style={style.input}
              value={title}
              onChangeText={title => this.setState({ title })}
            />
          </View>
          <TouchableOpacity onPress={this.save} style={style.button}>
            <Text style={style.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, backgroundColor: 'blue' }} />
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

export default DeckPropertyTitle;
