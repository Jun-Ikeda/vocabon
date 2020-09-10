import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import SwipeCards from 'react-native-swipeable-cards';

import { Functions } from '../../../../../../../config/Const';

import EachCard from './card/EachCard';
import NoMoreCards from './card/NoMoreCards';

import Buttons from './Buttons'

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Cards extends Component {
  constructor(props) {
    super(props);
    this.swiperRef = {};
    this.state = {
      layout: { height: 0, width: 0 },
      isFront: true,
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
        {this.renderCards()}
        {this.renderButtons()}
      </View>
    );
  }

  renderCards = () => {
    const { layout, isFront } = this.state;
    const { height, width } = layout;
    const { cards, navigation } = this.props;
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
        renderCard={cardData => (
          <EachCard
            {...cardData}
            layout={{ height, width }}
            isFront={isFront}
            onFliped={() => this.setState(prev => ({ isFront: !prev.isFront }))}
          />
        )}
        renderNoMoreCards={() => <NoMoreCards navigation={navigation} />}
        onSwipeRight={this.handleYup}
        onSwipeLeft={this.handleNope}
        onSwipeUp={this.handleMaybe}
        overlayRightText="😃"
        overlayLeftText="🤔"
        stackOffsetX=""
        ref={swiperRef => {
          this.swiperRef = swiperRef;
        }}
        hasMaybeAction
      />
    );
  };

  renderButtons =() => {
    const {} = this.state;
    return (
      <Buttons swiperRef={this.swiperRef} />
    )
  }

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
