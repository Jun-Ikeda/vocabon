import React, { Component } from 'react';
import { View, StyleSheet, Platform, Button } from 'react-native';
// import SwipeCards from 'react-native-swipeable-cards';
import DeckSwiper from 'react-native-deck-swiper';

import { Functions } from '../../../../../../../../../config/Const';

import HeaderWithBack from '../../../../../../../../../components/header/Header';

import CardFlip from './CardFlip';
// import NoMoreCards from './card/NoMoreCards';

import Buttons from '../Buttons';

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
  },
});

class Swiper extends Component {
  constructor(props) {
    super(props);
    this.swiperRef = {};
    this.state = {
      layout: { height: 0, width: 0 },
      isFront: true,
    };
  }

  render() {
    const { layout } = this.state
    return (
      <View
        style={style.container}
        onLayout={e => {
          const layout = Functions.onLayoutContainer(e);
          console.log({ layout })
          this.setState({ layout });
          // const { height, width } = this.state
          // console.log({ height, width });
        }}
      >
        {/* <View style={[layout, {backgroundColor: 'red', borderWidth: 3, borderColor: 'blue'}]} /> */}
        {this.renderCards()}
        {/* {this.renderButtons()} */}
      </View>
    );
  }

  renderCards = () => {
    const { layout, isFront } = this.state;
    const { height, width } = layout;
    const { cards, navigation } = this.props;
    const heightTest = 679
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
      <DeckSwiper
        cards={cardsDev}
        renderCard={(card) => <CardFlip {...card} />}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
          console.log({ height: typeof (height) })
        }}
        onSwipedAll={() => {
          console.log('onSwipedAll');
        }}
        horizontalThreshold={width / 8}
        cardIndex={0}
        backgroundColor="#4FD0E9"
        ref={(swiperRef) => {
          this.swiperRef = swiperRef;
        }}
        swipeBackCard
        stackSize={1}
        cardVerticalMargin={20}
        useViewOverflow={false}
        // containerStyle={{ flex: 1, borderWidth: 2 }}
        cardStyle={{ height: heightTest }}
      >
        {/* <Button title="press me" /> */}
        {/* <HeaderWithBack navigation={navigation} title="Play" /> */}
      </DeckSwiper>
    );
  };

  renderButtons = () =>
    // const {} = this.state;
    (
      <Buttons swiperRef={this.swiperRef} />
    )


  onSwipeRight(card) {
    console.log(`Yup for ${card.word}`);
    console.log(this.state.layout)
  }

  onSwipeLeft(card) {
    console.log(`Nope for ${card.word}`);
  }

  onSwipeUp(card) {
    console.log(`Maybe for ${card.word}`);
  }
}

export default Swiper;

// ,
//       {/* <SwipeCards
//         cards={cardsDev}
//         renderCard={cardData => (
//           <EachCard
//             {...cardData}
//             layout={{ height, width }}
//             isFront={isFront}
//             onFliped={() => this.setState(prev => ({ isFront: !prev.isFront }))}
//           />
//         )}
//         renderNoMoreCards={() => <NoMoreCards navigation={navigation} />}
//         onSwipeRight={this.handleYup}
//         onSwipeLeft={this.handleNope}
//         onSwipeUp={this.handleMaybe}
//         overlayRightText="😃"
//         overlayLeftText="🤔"
//         stackOffsetX=""
//         dragY={false}
//         ref={swiperRef => {
//           this.swiperRef = swiperRef;
//         }}
//         hasMaybeAction
//       /> */}
