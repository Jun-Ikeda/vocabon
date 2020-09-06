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

import Header from '../../../../components/Header';
import Icon from '../../../../components/Icon';
import Background from '../../../../components/Background';

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
    fontSize: 20,
    paddingTop: 30,
  },
  bottonContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: Color.background2,
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    const { title } = this.state;
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        <Background
          imageSource={letterpress}
          imageStyle={style.background}
          overlayStyle={style.backgroundOverlay}
        />
        <Header
          renderLeft={() => (
            <Icon.Ionicons name="md-close" style={style.headerIcon} />
          )}
          onPressLeft={this.cancel}
        />
        <View style={style.formContainer}>
          <Text style={style.title}>New Deck</Text>
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
          <Text style={style.forthose}>For those who ...</Text>
          {/* <View style={style.textinputContainer}>
            <TextInput
              value={learn}
              onChangeText={learn => this.setState({ learn })}
              style={style.textinput}
              placeholder="Learn"
            />
          </View> */}
          <View style={style.textinputContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('decklanguage', {
                  setState: state => this.setState(state),
                })
              }
            >
              <Text>Press</Text>
            </TouchableOpacity>
            <Text>{}</Text>
            {/* <TextInput
              value={language}
              onChangeText={language => this.setState({ language })}
              style={style.textinput}
              placeholder="Language"
            /> */}
          </View>
          {/* <View style={style.textinputContainer}>
            <TextInput
              value={understand}
              onChangeText={understand => this.setState({ understand })}
              style={style.textinput}
              placeholder="Understand"
            />
          </View> */}
        </View>
        <TouchableOpacity onPress={() => console.log(this.state.learn)}>
          <Text>aaaa</Text>
        </TouchableOpacity>
        <View style={style.bottonContainer}>
          <TouchableOpacity style={style.button} onPress={this.createDeck}>
            <Text style={style.buttonTitle}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
    // await FireObject.Materialized.createWithTitleAndRelatedLanguages({
    //   title: this.state.title,
    //   learningLanguage: this.state.learn,
    //   speakingLanguage: this.state.understand,
    // });
    navigateNav('bottom');
  };
}
