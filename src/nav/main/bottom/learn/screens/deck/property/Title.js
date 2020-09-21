import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Color from '../../../../../../../config/Color';
import { titleMaxLength } from '../../../../../../../config/Const';

import HeaderWithBack from '../../../../../../../components/header/HeaderWithBack';
import Icon from '../../../../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background2,
  },
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
  textBox: {
    flex: 4,
    justifyContent: 'center',
    padding: 20,
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
    borderColor: Color.font2,
    borderWidth: 1,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 5,
    alignSelf: 'stretch',
  },
  length: {
    position: 'absolute',
    right: 50,
    color: Color.font6,
  },
  deleteIcon: {
    color: Color.font5,
    fontSize: 25,
  },
  deleteContainer: {
    position: 'absolute',
    right: 30,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

class DeckPropertyTitle extends Component {
  constructor(props) {
    super(props);
    this.inputRef = {};
    this.maxLength = 10;
    this.state = {
      title: '',
      count: 0,
    };
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderHeader()}
        {this.renderTextbox()}
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={this.save} style={style.button}>
          <Text style={style.buttonText}>Save</Text>
        </TouchableOpacity>
        <View style={{ flex: 2 }} />
        <View style={{ flex: 8 }} />
      </View>
    );
  }

  renderHeader = () => {
    const { navigation } = this.props;
    return (
      <HeaderWithBack
        title="Title"
        navigation={navigation}
      />
    );
  }

  renderTextbox = () => {
    const { title, count } = this.state;
    return (
      <View style={style.textBox}>
        <TouchableOpacity
          style={style.deleteContainer}
          onPress={() => { this.setState({ title: '', count: '0' }); this.inputRef.focus(); }}
          ref={inputRef => {
            this.inputRef = inputRef;
          }}
        >
          <Icon.Ionicons name="md-close" style={style.deleteIcon} />
        </TouchableOpacity>
        <Text style={style.length}>
          (
          {count}
          /
          {titleMaxLength}
          )
        </Text>
        <TextInput
          style={style.input}
          value={title}
          onChangeText={
            title => { this.setState({ title }); this.setState({ count: title.length }); }
          }
          maxLength={titleMaxLength}
          ref={inputRef => {
            this.inputRef = inputRef;
          }}
        />
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
    const title = navigation.getParam('ti');
    this.setState({ title, count: title.length });
    console.log(title.length);
    this.inputRef.focus();
  }
}

export default DeckPropertyTitle;
