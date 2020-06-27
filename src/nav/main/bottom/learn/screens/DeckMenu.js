import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { HeaderConst, StyleConst } from '../../../../../config/Const';
import Color from '../../../../../config/Color';
import User from '../../../../../config/Firebase/User';

import Header from '../../../../../components/Header';
import Icon from '../../../../../components/Icon';
import UserIcon from '../../../../../components/UserIcon';

import { bottomRef } from '../../BottomNav';

const AnimatedIonicons = Animatable.createAnimatableComponent(Icon.Ionicons);

const headerMinPadding = HeaderConst.heightMin + HeaderConst.paddingTopByOS();

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    fontSize: 25,
    color: Color.font3,
  },
  deckinfoContainer: {
    flex: 1,
    backgroundColor: Color.background1,
  },
  headerContainer: {},
  titleContainer: {
    position: 'absolute',
    flexDirection: 'row',
  },
  animateImage: {
    width: 'auto',
    ...StyleConst.absoluteFullScreen,
    resizeMode: 'cover',
  },
});

class DeckMenu extends Component {
  constructor(props) {
    super(props);
    this.AnimatedImageValue = new Animated.Value(0);
    this.state = {
      id: '',
      deckinfo: {},
      v: 0,
      user: {},
      layout: { height: 0, width: 0 },
      header: { max: HeaderConst.heightMax, min: HeaderConst.heightMin },
      title: { height: 0, width: 0 },
    };
  }

  async UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    const deck = navigation.getParam('deck');
    const user = navigation.getParam('user');
    console.log({ deck });
    const v = navigation.getParam('v');
    // const user = await User.load({ uid: Object.values(deck)[0].user });
    console.log({ user });
    bottomRef.setTabVisible({ visible: false });
    this.setState({
      id: Object.keys(deck)[0],
      deckinfo: Object.values(deck)[0],
      v,
      user,
    });
  }

  render() {
    return (
      <View
        style={style.container}
        onLayout={({ nativeEvent }) => {
          const { height, width } = nativeEvent.layout;
          this.setState({ layout: { height, width } });
          this.setState({ header: { max: width * 0.66 } });
        }}
      >
        {this.renderAnimated({
          renderContent: () => (
            <View>
              {this.renderContent()}
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
              <Text>test</Text>
            </View>
          ),
        })}
      </View>
    );
  }

  renderBasicHeader = () => {
    const { navigation } = this.props;
    const {
      header: { max },
    } = this.state;
    const AnimateIconColor = this.AnimatedImageValue.interpolate({
      inputRange: [0, max - headerMinPadding],
      outputRange: [Color.font3, Color.font2],
      extrapolate: 'clamp',
    });
    return (
      <Header
        renderLeft={() => (
          <AnimatedIonicons
            name="ios-arrow-back"
            style={[style.headerIcon, { color: AnimateIconColor }]}
          />
        )}
        onPressLeft={() => navigation.goBack()}
        style={style.headerContainer}
      />
    );
  };

  renderAnimated = ({ renderContent }) => {
    try {
      const {
        deckinfo,
        layout: { width },
        header: { max },
        title: { height: titleHeight, width: titleWidth },
      } = this.state;
      const animateKeyArray = [
        { key: 'AnimateImageHeight', outputRange: [max, headerMinPadding] },
        {
          key: 'AnimateImageColor',
          outputRange: [Color.transparent2, Color.background1],
        },
        {
          key: 'AnimateTitlePositionX',
          outputRange: [10, (width - titleWidth) / 2],
        },
        {
          key: 'AnimateTitlePositionY',
          outputRange: [
            max - titleHeight,
            (HeaderConst.heightMin - titleHeight) / 2 +
              HeaderConst.paddingTopByOS(),
          ],
        },
        { key: 'AnimateTitleColor', outputRange: [Color.font3, Color.font2] },
        { key: 'AnimateTitleFontSize', outputRange: [48, 20] },
      ];
      const AnimateKey = {};
      animateKeyArray.forEach(key => {
        AnimateKey[key.key] = this.AnimatedImageValue.interpolate({
          inputRange: [0, max - headerMinPadding],
          outputRange: key.outputRange,
          extrapolate: 'clamp',
        });
      });
      const renderImage = () => (
        <View style={StyleConst.absoluteFullScreen}>
          <Animated.Image
            source={{ uri: `https://images.unsplash.com/${deckinfo.th.uri}` }}
            style={style.animateImage}
          />
          <Animated.View
            style={{
              backgroundColor: AnimateKey.AnimateImageColor,
              ...StyleConst.absoluteFullScreen,
            }}
          />
        </View>
      );
      const renderTitle = () => (
        <Animated.View
          style={[
            style.titleContainer,
            {
              marginLeft: AnimateKey.AnimateTitlePositionX,
              marginTop: AnimateKey.AnimateTitlePositionY,
            },
          ]}
        >
          <Animated.Text
            onLayout={e => {
              const { height, width } = e.nativeEvent.layout;
              this.setState({ title: { height, width } });
            }}
            style={{
              color: AnimateKey.AnimateTitleColor,
              fontSize: AnimateKey.AnimateTitleFontSize,
            }}
          >
            {deckinfo.ti}
          </Animated.Text>
        </Animated.View>
      );
      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: max }}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: { contentOffset: { y: this.AnimatedImageValue } },
              },
            ])}
            style={style.deckinfoContainer}
          >
            {renderContent()}
          </ScrollView>
          <Animated.View
            style={{
              position: 'absolute',
              width,
              height: AnimateKey.AnimateImageHeight,
            }}
          >
            {renderImage()}
            {renderTitle()}
            {this.renderBasicHeader()}
          </Animated.View>
        </View>
      );
    } catch (error) {
      // console.log(error);
    }
  };

  renderContent = () => {
    const { id, deckinfo, v, user } = this.state;
    const renderAttribution = () => {
      if (deckinfo.th.user.name !== 'me') {
        return (
          <TouchableOpacity
            onPress={() => Linking.openURL(deckinfo.th.user.link)}
          >
            <Text style={{ color: Color.font5, textAlign: 'right' }}>
              {`Photo by ${deckinfo.th.user.name} / Unsplash`}
            </Text>
          </TouchableOpacity>
        );
      }
      return null;
    };
    return (
      <View>
        {renderAttribution()}
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text>{`${deckinfo.num} words ${v} viewed`}</Text>
            <Text>{`Learn ${deckinfo.lang1} In ${deckinfo.lang2}`}</Text>
          </View>
          <UserIcon user={user} size={28} />
        </View>
      </View>
    );
  };

  componentWillUnmount() {
    bottomRef.setTabVisible({ visible: true });
  }
}

export default DeckMenu;
