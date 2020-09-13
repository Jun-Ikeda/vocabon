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
    borderWidth: 2,
  },
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
  textBox: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: Color.background5,
  },
  buttonText: {
    justifyContent: 'center',
    fontSize: 20,
  },
  input: {
    height: 30,
    width: 400,
    borderColor: Color.font2,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 5,
  },
});

class DeckPropertyTitle extends Component {
  constructor(props) {
    super(props);
    this.maxLength = 10;
    this.state = {
      title: '',
      textLength: 0,
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
            onChangeText={
              title => this.setState({ title })
            }
            // onChangeText={
            //   title => this.setState({ title, textLength: this.maxLength - title.length})
            // }
            maxLength={10}
          />
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={this.save} style={style.button}>
          <Text style={style.buttonText}>Save</Text>
        </TouchableOpacity>
        <View style={{ flex: 2 }} />
        <View style={{ flex: 8 }} />
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
