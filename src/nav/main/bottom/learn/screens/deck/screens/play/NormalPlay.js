import React, { Component } from 'react';
import { View, Text, StyleSheet /* TouchableOpacity */ } from 'react-native';
// import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Color from '../../../../../../../../config/Color';
import Deck from '../../../../../../../../config/Firebase/Deck';

import Header from '../../../../../../../../components/header/HeaderWithBack';
import Icon from '../../../../../../../../components/Icon';

import Swiper from './card/Swiper';
import HeaderWithBack from '../../../../../../../../components/header/HeaderWithBack';

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
    this.menuRef = {};
    this.state = {
      cards: [],
      loaded: false,
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        <HeaderWithBack
          navigation={navigation}
          title="Play"
          renderRight={this.renderRightIcon}
          onPressRight={this.onPressRightIcon}
        />
        {this.renderContent()}
        {this.renderMenuOverlay()}
      </View>
    );
  }

  async componentDidMount() {
    try {
      const { navigation } = this.props;
      const deckinfo = navigation.getParam('deckinfo');
      const cards = await Deck.Card.load({ uri: deckinfo.card });
      this.setState({ cards, loaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  renderContent = () => {
    const { loaded } = this.state;
    const { navigation } = this.props;
    if (loaded) {
      const { cards } = this.state;
      return (
        <Swiper
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

  renderRightIcon = () => (
    <Icon.Entypo name="dots-three-vertical" />
    // <Menu
    //   ref={menuRef => {
    //     this.menuRef = menuRef;
    //   }}
    //   button={<Text onPress={() => this.menuRef.show()}>Show menu</Text>}
    // >
    //   <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
    //   <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
    //   <MenuItem onPress={this.hideMenu} disabled>
    //     Menu item 3
    //   </MenuItem>
    //   <MenuDivider />
    //   <MenuItem onPress={() => this.menuRef.hide()}>Menu item 4</MenuItem>
    // </Menu>
  );

  onPressRightIcon = () => {};

  renderMenuOverlay = () => {
    return <View />;
  };
}

export default DeckPlay;
