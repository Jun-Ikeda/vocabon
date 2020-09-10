import React, { Component } from 'react';
import { View, Text, StyleSheet /* TouchableOpacity */ } from 'react-native';

import Color from '../../../../../../../config/Color';
import Deck from '../../../../../../../config/Firebase/Deck';

import Header from '../../../../../../../components/header/Header';
import Icon from '../../../../../../../components/Icon';

import Cards from './Cards';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
  },
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
});

class DeckPlay extends Component {
  constructor(props) {
    super(props);
    this.CardsRef = {};
    this.state = {
      cards: [],
      loaded: false,
    };
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
          renderTitle={() => <Text>Play your deck</Text>}
        />
        {this.renderContent()}
      </View>
    );
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const deckinfo = navigation.getParam('deckinfo');
    const cards = await Deck.Card.load({ uri: deckinfo.card });
    this.setState({ cards, loaded: true });
  }

  renderContent = () => {
    const { loaded } = this.state;
    const { navigation } = this.props;
    if (loaded) {
      const { cards } = this.state;
      return (
        <Cards
          cards={cards}
          ref={cardsRef => {
            this.CardsRef = cardsRef;
          }}
          navigation={navigation}
        />
      );
    }
    return null;
  };
}

export default DeckPlay;
