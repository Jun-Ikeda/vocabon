import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import SwipeCards from 'react-native-swipeable-cards';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Functions } from '../../../../../../../config/Const';

import EachCard from './card/EachCard';
import NoMoreCards from './card/NoMoreCards';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardstack: {
    flex: 1,
    backgroundColor: 'blue',
  },
  cardContainer: {
    // backgroundColor: 'orange',
    // right: 20,
    // left: 20,
  },
  cardflip: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  card: {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'green',
  },
});

class Cards extends Component {
  constructor(props) {
    super(props);
    this.swiperRef = {};
    this.state = {
      layout: { height: 0, width: 0 },
      tekito: '',
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
        {/* <CardStack
          style={style.cardstack}
          ref={swiperRef => {
            this.swiperRef = swiperRef;
          }}

          onSwipedRight={(index) => console.log(index)}
          onSwipedLeft={(index) => console.log(index)}
        > */}
        {this.renderCards()}
        <TouchableOpacity onPress={() => this.setState({ tekito: 'aaa' })}>
          <Text>tekito</Text>
        </TouchableOpacity>
        {/* </CardStack> */}
      </View>
    );
  }

  renderCards = () => {
    // const { layout } = this.state;
    // const { height, width } = layout;
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
    return (
      <SwipeCards
        cards={cardsDev}
        renderCard={(cardData) => <EachCard {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        onSwipeRight={this.handleYup}
        onSwipeLeft={this.handleNope}
        onSwipeUp={this.handleMaybe}
        ref={swiperRef => { this.swiperRef = swiperRef; }}
        hasMaybeAction
      />
    );
    // return cardsDev.map((card, index) => (
    // <Card
    //   style={[
    //     style.cardContainer,
    //     { height: height - 40, width: width - 40, left: 20, top: 20 },
    //   ]}
    // >
    //   <CardFlip
    //     style={style.cardflip}
    //     ref={card => {
    //       this[`card${index}`] = card;
    //     }}
    //   >
    //     <TouchableOpacity
    //       style={[style.card, { height: height - 40, width: width - 40 }]}
    //       onPress={
    //          () => this[`card${index}`].flip()
    //         // () => console.log('pressed')
    //       }
    //     >
    //       <Text style={style.label}>{card.word}</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={[style.card, { height: height - 40, width: width - 40 }]}
    //       onPress={
    //         () => this[`card${index}`].flip()
    //         // () => console.log('pressed')
    //       }
    //     >
    //       <Text style={style.label}>{card.def}</Text>
    //     </TouchableOpacity>
    //   </CardFlip>
    // </Card>
    // ));
  };

  onSwipeRight(card) {
    console.log(`Yup for ${card.word}`);
  }

  onSwipeLeft(card) {
    console.log(`Nope for ${card.word}`);
  }

  onSwipeUp(card) {
    console.log(`Maybe for ${card.word}`);
  }
}

export default Cards;
