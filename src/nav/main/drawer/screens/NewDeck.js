import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Color from '../../../../config/Color';
// import { FireObject } from '../../../../config/Firebase';
import Deck from '../../../../config/Firebase/Deck';
import { getRandomImage } from '../../../../config/Unsplash';

import Header from '../../../../components/header/Header';
import Icon from '../../../../components/Icon';
import Background from '../../../../components/Background';
import ItemWithDescriptionRight from '../../../../components/item/ItemWithDescriptionRight'

import { navigateNav } from '../../../Nav';

const letterpress = require('../../../../../assets/background/letterpress.jpg');

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    fontSize: 25,
    color: Color.font3,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: 'auto',
  },
  backgroundOverlay: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  title: {
    color: Color.font3,
    textAlign: 'center',
    fontSize: 25,
    marginTop: 20,
    marginBottom: 40,
  },
  formContainer: {
    marginHorizontal: 30,
    // borderWidth: 2,
  },
  textinputContainer: {
    height: 70,
    marginVertical: 5,
  },
  textinput: {
    flex: 1,
    borderColor: 'transparent',
    borderBottomColor: Color.font4,
    borderWidth: 1,
    color: Color.font4,
    textAlign: 'center',
    fontSize: 25,
  },
  deleteContainer: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  deleteIcon: {
    color: Color.font5,
    fontSize: 25,
  },
  forthose: {
    color: Color.font5,
    fontSize: 15,
    paddingTop: 30,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonContainer2: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    borderWidth: 1,
    borderColor: Color.font3,
    height: 40,
  },
  chooselan: {
    color: Color.font3,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 50,
    paddingLeft: 10,
  },
  buttonIcon: {
    fontSize: 20,
    paddingTop: 10,
    color: 'white',
  },
  button: {
    backgroundColor: Color.background2,
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  language: {
    color: Color.font3,
    textAlign: 'center',
    fontSize: 15,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 20,
  },
});

export default class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', learn: '', understand: '' };
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderBackground()}
        {this.renderHeader()}
        <View style={style.formContainer}>
          <Text style={style.title}>New Deck</Text>
          {this.renderTitleTextInput()}
          <Text style={style.forthose}>For those who ...</Text>
          {this.renderDeckLanguage()}
        </View>
        <View style={style.buttonContainer}>
          {this.renderCreateButton()}
        </View>
      </View>
    );
  }

  renderBackground = () => (
    <Background
      imageSource={letterpress}
      imageStyle={style.background}
      overlayStyle={style.backgroundOverlay}
    />
  )

  renderHeader = () => (
    <Header
      renderLeft={() => (
        <Icon.Ionicons name="md-close" style={style.headerIcon} />
      )}
      onPressLeft={this.cancel}
    />
  )

  renderTitleTextInput = () => {
    const { title } = this.state;
    return (
      <View style={style.textinputContainer}>
        <TextInput
          value={title}
          onChangeText={title => this.setState({ title })}
          style={style.textinput}
          placeholder="TITLE"
          maxLength={20}
        />
        <TouchableOpacity
          style={style.deleteContainer}
          onPress={() => this.setState({ title: '' })}
        >
          <Icon.Ionicons name="md-close" style={style.deleteIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  renderDeckLanguage = () => {
    const { navigation } = this.props;
    const { learn } = this.state;
    return (
      <View style={style.buttonContainer2}>
        <Text style={style.chooselan}>Language Type</Text>
        <Text style={style.language}>{learn}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('decklanguage', {
              setState: state => this.setState(state),
            })}
        >
          <Icon.AntDesign
            name="down"
            style={style.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderCreateButton = () => (
    <TouchableOpacity style={style.button} onPress={this.createDeck}>
      <Text style={style.buttonTitle}>Create</Text>
    </TouchableOpacity>
  )

  cancel = () => {
    navigateNav('bottom');
  };

  createDeck = async () => {
    const { title, learn, understand } = this.state;
    const deckid = await Deck.create({
      title,
      learn,
      understand,
    });
    const th = await getRandomImage({ word: '' });
    await Deck.save({ deckid, data: { th }, expires: null });
    navigateNav('bottom');
  };
}
