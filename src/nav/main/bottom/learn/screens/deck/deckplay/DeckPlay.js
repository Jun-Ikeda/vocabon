import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../../../../../../../config/Color';
import Deck from '../../../../../../../config/Firebase/Deck';

import Header from '../../../../../../../components/Header';
import Icon from '../../../../../../../components/Icon';

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
    this.state = {
      cards: [],
    };
  }
  //   async UNSAFE_componentWillMount() {

  //   }

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
    // const navigation = this.props.navigation
    const deckinfo = navigation.getParam('deckinfo');
    console.log({ uri: deckinfo.cards });
    const cards = await Deck.Card.load({ uri: deckinfo.card });
    this.setState({ cards });
    console.log(cards);
  }

  renderContent = () => {
    const { cards } = this.state;
    return cards.map(card => (
      <View>
        <Text>{card.word}</Text>
        <Text>{card.def}</Text>
        <Text>{card.eg}</Text>
        <Text>{card.cf}</Text>
      </View>
    ));
  }
}

export default DeckPlay;
