import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardFlip from 'react-native-card-flip';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Functions } from '../../../../../../../config/Const';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardstack: {
    flex: 1,
    backgroundColor: 'blue',
  },
  cardContainer: {
    backgroundColor: 'orange',
    // right: 20,
    // left: 20,
  },
  cardflip: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  card: {
    flex: 1,
    backgroundColor: 'green',
  },
});

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: { height: 0, width: 0 },
    };
  }

  render() {
    return (
      <View
        style={style.container}
        onLayout={e =>
          this.setState({ layout: Functions.onLayoutContainer(e) })
        }
      >
        <CardStack
          style={style.cardstack}
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwipedLeft={() => console.log('left')}
          onSwipedRight={() => console.log('right')}
        >
          {this.renderCards()}
        </CardStack>
      </View>
    );
  }

  renderCards = () => {
    const { layout } = this.state;
    const { height, width } = layout;
    const { cards } = this.props;
    const cardsForWeb = [
      {
        word: 'austere',
        def: '禁欲的',
        cf: 'apathy',
        eg: '',
        er: 0,
        mark: [],
      },
      {
        word: 'pasteurization',
        def: '低温殺菌',
        cf: 'sanitization',
        eg: '',
        er: 0,
        mark: [],
      },
      {
        word: 'hippopotomonstrosesquipedaliophobia',
        def: '長い単語恐怖症',
        cf: 'phobia',
        eg:
          'I suffer from hippopotomonstrosesquipedaliophobia, so please talk to me with any words with more than 5 syllables. ',
        er: 0,
        mark: [],
      },
    ];
    const cardsDev = Platform.OS === 'web' ? cardsForWeb : cards;
    return cardsDev.map((card, index) => (
      <Card
        style={[
          style.cardContainer,
          { height: height - 40, width: width - 40, left: 20, top: 20 },
        ]}
      >
        <CardFlip
          style={style.cardflip}
          ref={card => {
            this[`card${index}`] = card;
          }}
        >
          <TouchableOpacity
            style={style.card}
            onPress={
              /* () => this[`card${index}`].flip() */ () =>
                console.log('pressed')
            }
          >
            <Text style={style.label}>{card.word}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.card}
            onPress={
              /* () => this[`card${index}`].flip() */ () =>
                console.log('pressed')
            }
          >
            <Text style={style.label}>{card.word}</Text>
          </TouchableOpacity>
        </CardFlip>
      </Card>
    ));
  };
}

export default Cards;
