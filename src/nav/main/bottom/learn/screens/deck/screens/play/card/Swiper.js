import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity /* , Text */,
} from 'react-native';
// import SwipeCards from 'react-native-swipeable-cards';
import DeckSwiper from 'react-native-deck-swiper';
import Color from '../../../../../../../../../config/Color';

import { Functions } from '../../../../../../../../../config/Const';

import CardFlip from './CardFlip';

// import Buttons from '../Buttons';
import Icon from '../../../../../../../../../components/Icon';
import Buttons from './Buttons';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  final: {
    backgroundColor: '#4FD0E9',
    flexDirection: 'row',
    fontWeight: '800',
    justifyContent: 'center',
  },
});

class Swiper extends Component {
  constructor(props) {
    super(props);
    this.swiperRef = {};
    this.cardRef = {};
    this.state = {
      layout: { height: 0, width: 0 },
      rightSwipedIndex: [],
      leftSwipedIndex: [],
      isFinishedScreenVisible: false,
      isCardFront: true,
    };
  }

  render = () => (
    <View style={style.container}>
      {this.renderFinalAnnouncement()}
      {this.renderCardsContainer()}
      {this.renderButtons()}
    </View>
  );

  renderFinalAnnouncement() {
    const {
      isFinishedScreenVisible,
      rightSwipedIndex,
      leftSwipedIndex,
    } = this.state;
    if (isFinishedScreenVisible) {
      return (
        <View>
          <Text style={style.final}>Congraturations!</Text>
          <Text style={style.final}>
            Achievement:
            {rightSwipedIndex.length}
            /
            {rightSwipedIndex.length + leftSwipedIndex.length}
            words
          </Text>
          <Text style={style.final}>
            Rate:
            {Math.floor(
              (100 * rightSwipedIndex.length) /
                (rightSwipedIndex.length + leftSwipedIndex.length),
            )}
            %
          </Text>
          {/* <br /> */}
          {this.renderPerfectMessage()}
        </View>
      );
    }
    return null;
  }

  renderPerfectMessage() {
    const { leftSwipedIndex } = this.state;
    if (leftSwipedIndex.length === 0) {
      return <Text style={style.final}>perfect!</Text>;
    }
    return null;
  }

  renderCardsContainer = () => (
    <View
      style={style.container}
      onLayout={e => {
        this.setState({
          layout: Functions.onLayoutContainer(e),
        });
      }}
    >
      {this.renderCards()}
    </View>
  );

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
    if (!(height === 0)) {
      return (
        <DeckSwiper
          cards={cardsDev}
          renderCard={card => (
            <CardFlip
              {...card}
              ref={ref => {
                this.cardRef = ref;
              }}
              setStateFlip={() =>
                this.setState(prev => ({ isCardFront: !prev.isCardFront }))
              }
            />
          )}
          onSwipedRight={this.onSwipedRight}
          onSwipedLeft={this.onSwipedLeft}
          onSwiped={() => this.setState({ isCardFront: true })}
          disableTopSwipe
          disableBottomSwipe
          onSwipedAll={this.onSwipedAll}
          horizontalThreshold={width / 8}
          cardIndex={0}
          backgroundColor="#4FD0E9"
          ref={swiperRef => {
            this.swiperRef = swiperRef;
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
    const { isCardFront } = this.state;
    return (
      <Buttons
        onPress={() => this.cardRef.flip()}
        isFront={isCardFront}
        onPressLeft={() => this.swiperRef.swipeLeft()}
        onPressCenter={() => this.onPressedBack()}
        onPressRight={() => this.swiperRef.swipeRight()}
      />
    );
  };

  onSwipedRight = index => {
    const { rightSwipedIndex } = this.state;
    rightSwipedIndex.push(index);
    this.setState({ rightSwipedIndex });
  };

  onSwipedLeft = index => {
    const { leftSwipedIndex } = this.state;
    leftSwipedIndex.push(index);
    this.setState({ leftSwipedIndex });
  };

  onPressedBack = () => {
    this.swiperRef.swipeBack(this.swiperRef.previousCardIndex);
    const { rightSwipedIndex: rIndex, leftSwipedIndex: lIndex } = this.state;
    const newRIndex = rIndex.filter(
      hello => hello !== rIndex.length + lIndex.length - 1,
    );
    const newLIndex = lIndex.filter(
      goodbye => goodbye !== rIndex.length + lIndex.length - 1,
    );
    this.setState({
      rightSwipedIndex: newRIndex,
      leftSwipedIndex: newLIndex,
    });
  };

  onSwipedAll = () => {
    const { rightSwipedIndex } = this.state;
    const { leftSwipedIndex } = this.state;
    this.setState(prev => ({
      isFinishedScreenVisible: !prev.isFinishedScreenVisible,
    }));
    console.log('Yup:', rightSwipedIndex);
    console.log('Nopes:', leftSwipedIndex);
  };
}

export default Swiper;
