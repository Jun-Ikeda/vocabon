import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardFlip from 'react-native-card-flip';

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
  content: {
    flex: 1,
    backgroundColor: 'blue',
  },
  card: {
    backgroundColor: 'orange',
    height: 200,
    width: 100,
  },
});

class DeckPlay extends Component {
  constructor(props) {
    super(props);
    this.swiper = {};
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
        <CardStack
          style={style.content}
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwipedLeft={() => console.log('left')}
          onSwipedRight={() => console.log('right')}
        >
          <Card style={[style.card, style.card1]}>
            <Text style={style.label}>A</Text>
          </Card>
          <Card style={[style.card, style.card2]}>
            <Text style={style.label}>B</Text>
          </Card>
          <Card style={[style.card, style.card1]}>
            <Text style={style.label}>C</Text>
          </Card>
        </CardStack>
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
    try {
      return cards.map(card => (
        <View>
          <Text>{card.word}</Text>
          <Text>{card.def}</Text>
          <Text>{card.eg}</Text>
          <Text>{card.cf}</Text>
        </View>
      ));
    } catch (error) {
      console.log(error);
      return null;
    }
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
