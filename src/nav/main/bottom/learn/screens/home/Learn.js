import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import User from '../../../../../../config/Firebase/User';
import Storage from '../../../../../../config/Storage';
// import { Functions } from '../../../../../../config/Const';

import DeckCarousel from '../../../../../../components/DeckCarousel';
import UserIcon from '../../../../../../components/UserIcon';

import Gesture from '../../../Gesture';
import TopHeader from '../../../TopHeader';
import { bottomRef } from '../../../BottomNav';
import Deck from '../../../../../../config/Firebase/Deck';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Learn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        height: 100,
        width: 100,
      },
      myAccount: {},
      auth: {},
      myDecks: {},
    };
  }

  async UNSAFE_componentWillMount() {
    // await Storage.Function.load({ key: 'auth' }).then(async auth => {
    //   await this.setState({ auth });
    //   await User.load({ uid: auth.uid, expires: null }).then(user => {
    //     this.setState({ myAccount: user });
    //   });
    // });
    await Storage.Function.load({ key: 'auth' }).then(async auth => {
      await this.setState({ auth });
      User.updateListener({
        uid: auth.uid,
        callback: async data => {
          await User.update({
            uid: auth.uid,
            updated: data,
            expires: null,
          })
            .then(async myAccount => {
              this.setState({ myAccount });
              const {
                local: { decks },
              } = myAccount;
              const array = [];
              for (const child in decks) {
                if (child) {
                  const data = await Deck.load({
                    deckid: child,
                    expires: null,
                  });
                  array.push({ [child]: data });
                  console.log({ array });
                }
              }
              // console.log({ obj });
              await this.setState({ myDecks: array });
            })
            .catch(error => console.log(error));
        },
      });
      // await User.load({ uid: auth.uid, expires: null }).then(user => {
      //   this.setState({ myAccount: user });
      // });
    });
  }

  render() {
    const { navigation } = this.props;
    const {
      layout: { width },
      myDecks,
    } = this.state;
    return (
      <Gesture>
        {this.renderHeader()}
        <View
          style={style.container}
          pointerEvents="box-none"
          onLayout={({ nativeEvent }) => {
            const { height, width } = nativeEvent.layout;
            this.setState({ layout: { height, width } });
          }}
        >
          <DeckCarousel
            data={myDecks}
            style={{ width }}
            navigation={navigation}
          />
          <TouchableOpacity onPress={() => console.log(this.state)}>
            <Text style={{ color: 'white' }}>aaaaaaaa</Text>
          </TouchableOpacity>
        </View>
      </Gesture>
    );
  }

  renderHeader = () => {
    const { myAccount } = this.state;
    return (
      <TopHeader
        title="Learn"
        renderRight={() => (
          <UserIcon size={36} user={myAccount} style={style.userIcon} />
        )}
        onPressRight={() => bottomRef.navigate(1)}
      />
    );
  };
}
export default Learn;
