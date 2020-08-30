import React, { Component, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Color from '../../../../../../../config/Color';
import Deck from '../../../../../../../config/Firebase/Deck';
import { StyleConst, Functions } from '../../../../../../../config/Const';

import Header from '../../../../../../../components/Header';
import Icon from '../../../../../../../components/Icon';
import { Function } from '../../../../../../../config/Firebase/Firebase';

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
    this.swiper = {};
    this.state = {
      cards: [],
      // layout: { height: 0, width: 0 },
    };
  }
  //   async UNSAFE_componentWillMount() {

  //   }

  render() {
    // const { layout } = this.state;
    const { navigation } = this.props;
    // const { height, width } = layout;
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
        <TouchableOpacity
          onPress={() => {
            this.swiper.swipeLeft();
          }}
        >
          <Text>Left</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async componentDidMount() {
    const { navigation } = this.props;
    // const navigation = this.props.navigation
    const deckinfo = navigation.getParam('deckinfo');
    /* deckinfo = {
      ti: 'Deck 1',
      user: 'iodaojofigo20tu90ruji',
      thu: {},
      cards: 'https://djaoeigorkopak'
    }
    */
    console.log({ uri: deckinfo.cards });
    const cards = await Deck.Card.load({ uri: deckinfo.card });
    this.setState({ cards });
    console.log(cards);
  }

  renderContent = () => {
    const { cards } = this.state;
    return <Cards card={cards} />;
    // try {
    //   return cards.map(card => (
    //     <View>
    //       <Text>{card.word}</Text>
    //       <Text>{card.def}</Text>
    //       <Text>{card.eg}</Text>
    //       <Text>{card.cf}</Text>
    //     </View>
    //   ));
    // } catch (error) {
    //   console.log(error);
    //   return null;
    // }
    /*
    cards: [
      { word: 'austere', def: '禁欲的', eg: '', cf: 'apathy' },
      { word: 'hippopotomonstrosesquipedaliophobia', def: '長い単語恐怖症', eg: 'I suffer from hippopotomonstrosesquipedaliophobia so please talk to me without any word with more than 5 syllables',  }
    ]
    */
  };
}

export default DeckPlay;

/*
Card(配列型)を取得 > this.setState

<CardStack>
  {cards.map(card => (
    <何かしらのコンポーネント />
  ))}
</CardStack>

class 何かしらのコンポーネント extends Component {
  render() {
    return (
      <Card style={[style.card, style.card1]}>
        <CardFlip ref={card => {this.card = card}}>
            <TouchableOpacity style={styles.card} onPress={() => this.card.flip()}>
              <HTML読むようのやつ>
                <Text style={style.label}>{card.word}</Text>
              </HTML読むやつ>
            </TouchableOpacity>
            <TouchableOpacity style={} onPress={() => this.card.flip()}>
              <HTML読むようのやつ>
                <Text>{card.def}</Text>
              </HTML読むやつ>
            </TouchableOpacity>
        </CardFlip>
      </Card>
    )
  }
}
{cards.map((item, index) => {
  return (
    <CardFlip style={ styles.cardContainer } ref={ (card) => this['card' + index] = card } >
      <TouchableOpacity style={ styles.card } onPress={() => this['card' + index].flip()} ><Text>{item}</Text></TouchableOpacity>
      <TouchableOpacity style={ styles.card } onPress={() => this['card' + index].flip()} ><Text>{item}</Text></TouchableOpacity>
    </CardFlip>
  )
})}

this.card
this['card'+index] = card
this: {
  card0: 何かref,
  card1: 何かref,
  card2: 何かref
}

*/
