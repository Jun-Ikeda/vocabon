import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../config/Color';
import Deck from '../config/Firebase/Deck';
import User from '../config/Firebase/User';

import UserIcon from './UserIcon';

const style = StyleSheet.create({
  carouselContainer: {
    backgroundColor: Color.background1,
  },
  thumbnail: {
    flex: 1,
    resizeMode: 'cover',
    width: 'auto',
  },
});

class DeckCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: { height: 100, width: 100 },
      active: 0,
      v: {},
      user: {},
    };
  }

  render() {
    const { data } = this.props;
    const {
      layout: { /* height,  */ width },
      active,
    } = this.state;
    try {
      return (
        <View
          onLayout={({ nativeEvent }) => {
            const { height, width } = nativeEvent.layout;
            this.setState({ layout: { height, width } });
          }}
        >
          <Carousel
            data={data}
            renderItem={this.renderItem}
            itemWidth={width * 0.6}
            sliderWidth={width * 1.0}
            // containerCustomStyle={{ flex: 1, backgroundColor: "#eee" }}
            onSnapToItem={index => this.setState({ active: index })} // for pagination
            loop
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={active}
            containerStyle={{ paddingVertical: 15 }}
            dotStyle={{ backgroundColor: Color.font3 }}
          />
        </View>
      );
    } catch (error) {
      return null;
    }
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    const {
      layout: { width },
      v,
      user,
    } = this.state;
    try {
      // const cardIndex = index % data.length;
      // const id = Object.keys(data)[cardIndex];
      const id = Object.keys(item)[0];
      const deckinfo = Object.values(item)[0];
      return (
        <TouchableOpacity
          style={[
            style.carouselContainer,
            {
              width: width * 0.6,
              height: width * 0.5,
              borderRadius: width * 0.05,
            },
          ]}
          onPress={() => {
            navigation.navigate('deckmenu', {
              deck: item,
              user: user[id],
              v: v[id],
            });
          }}
        >
          <Image
            source={{ uri: `https://images.unsplash.com/${deckinfo.th.uri}` }}
            style={[
              style.thumbnail,
              {
                borderTopLeftRadius: width * 0.05,
                borderTopRightRadius: width * 0.05,
              },
            ]}
          />
          <View style={{ padding: width * 0.03 }}>
            <Text style={{ fontSize: 18 }}>{deckinfo.ti}</Text>
            <View style={{ padding: 5, flexDirection: 'row' }}>
              <View>
                <Text style={{ fontSize: 12, color: Color.font5 }}>
                  {`${deckinfo.num} words ${v[id]} views`}
                </Text>
                <Text style={{ fontSize: 12, color: Color.font5 }}>
                  {`Learn ${deckinfo.lang1} In ${deckinfo.lang2}`}
                </Text>
              </View>
              <UserIcon user={user[id]} size={32} />
            </View>
          </View>
        </TouchableOpacity>
      );
    } catch (error) {
      // console.log(error);
      return null;
    }
  };

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    // console.log({ data });
    if (data !== prevProps.data) {
      try {
        for (const child of data) {
          const id = Object.keys(child)[0];
          const deckinfo = Object.values(child)[0];
          Deck.setListenerV({
            deckid: id,
            callback: v => {
              this.setState(prev => {
                const newV = { ...prev.v };
                newV[id] = v;
                return { v: newV };
              });
            },
          });
          User.load({ uid: deckinfo.user }).then(user => {
            this.setState(prev => {
              const newUsers = { ...prev.user };
              newUsers[id] = user;
              return { user: newUsers };
            });
          });
        }
        return null;
      } catch (error) {
        return null;
      }
      // const values = Object.keys(data).map(key => data[key]);
      // console.log({ propsData: values });
      // try {
      //   for (const child of Object.keys(data)) {
      //     Deck.setListenerV({
      //       deckid: child,
      //       callback: v =>
      //         this.setState(prev => {
      //           prev.v[child] = v; /* .push(v); */
      // console.log({ v: prev.v });
      // console.log({ [child]: v });
      //           return { v: prev.v };
      //         }),
      //     });
      //   }
      // } catch (error) {
      //   return null;
      // }
    } else {
      return null;
    }
  }
}

export default DeckCarousel;
