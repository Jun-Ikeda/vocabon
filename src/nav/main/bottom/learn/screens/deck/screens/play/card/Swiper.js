import React, { Component } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity/* , Text */ } from 'react-native';
// import SwipeCards from 'react-native-swipeable-cards';
import DeckSwiper from 'react-native-deck-swiper';

import { Functions } from '../../../../../../../../../config/Const';

import CardFlip from './CardFlip';

// import Buttons from '../Buttons';
import Icon from '../../../../../../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    // marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   flex: 1,
  //   justifyContent: 'space-between',
  //   alignSelf: 'center',
  // },
  icon: {
    fontSize: 30,
  },
});

class Swiper extends Component {
  constructor(props) {
    super(props);
    this.swiperRef = {};
    this.state = {
      layout: { height: 0, width: 0 },
      onLayout: false,
    };
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderCardsContainer()}
        {this.renderButtons()}
        {/* <TouchableOpacity onPress={() => this.swiperRef.swipeLeft()}>
          <Text>test</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  renderCardsContainer = () => (
    <View
      style={style.container}
      onLayout={e => {
        this.setState({
          layout: Functions.onLayoutContainer(e),
          onLayout: true,
        });
      }}
    >
      {this.renderCards()}
    </View>
  );

  renderCards = () => {
    const { layout, onLayout } = this.state;
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
    if (onLayout) {
      return (
        <DeckSwiper
          cards={cardsDev}
          renderCard={card => <CardFlip {...card} />}
          /* onSwiped={cardIndex => {
              console.log(cardIndex);
              console.log({ height: typeof height });
            }} */
          onSwipeRight={this.onSwipeRight}
          onSwipeLeft={this.onSwipeLeft}
          onSwipedAll={() => console.log('onSwipedAll')}
          horizontalThreshold={width / 8}
          cardIndex={0}
          backgroundColor="#4FD0E9"
          ref={swiperRef => {
            this.swiperRef = swiperRef;
            // this.setState({ a: true });
          }}
          stackSize={1}
          cardVerticalMargin={20}
          useViewOverflow={false}
          cardStyle={{ height: height - 40 }}
        />
      );
    }
    return null;
  };

  renderButtons = () => {
    // const swiperRef = this.swiperRef;
    const buttons = [
      {
        collection: 'Entypo',
        name: 'check',
        onPress: () => this.swiperRef.swipeLeft(),
      },
      {
        collection: 'AntDesign',
        name: 'back',
        onPress: () => this.swiperRef.swipeBack(this.swiperRef.previousCardIndex),
      },
      {
        collection: 'Entypo',
        name: 'cross',
        onPress: () => this.swiperRef.swipeRight(),
      },
    ];
    return (
      <View style={style.buttonContainer}>
        {buttons.map(button => {
          const { collection, name, onPress } = button;
          const IconComponent = Icon[collection];
          return (
            <TouchableOpacity onPress={onPress}>
              <IconComponent name={name} style={style.icon} />
            </TouchableOpacity>
          );
        })
        }
      </View>
    );

    // const {} = this.state;
    // <Buttons swiperRef={this.swiperRef} />
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
