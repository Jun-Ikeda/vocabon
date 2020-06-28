import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import GestureRecognizer from 'react-native-swipe-gestures';

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
    // backgroundColor: Color.background1,
  },
  headerContainer: {},
  titleContainer: {
    position: 'absolute',
    flexDirection: 'row',
  },
  animateImage: {
    width: 'auto',
    ...StyleConst.absoluteFullScreen,
    // position: 'absolute',
    // top: 0,
    resizeMode: 'cover',
  },
  usericon: {},
  infoContainer: { flex: 1 },
  contentContaierSmall: {
    flexDirection: 'row',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContaier: {
    backgroundColor: Color.background1,
    padding: 5,
  },
  photographerButton: {
    alignItems: 'flex-end',
    // backgroundColor: 'red',
    flex: 1,
  },
  gesture: {
    // flex: 1,
    ...StyleConst.absoluteFullScreen,
  },
  deckButtonContainer: {
    flexDirection: 'row',
  },
  deckButton: {
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  deckButtonTitle: {
    fontSize: 15,
  },
  deckButtonIcon: {
    fontSize: 20,
  },
});

class DeckMenu extends Component {
  constructor(props) {
    super(props);
    this.AnimatedImageValue = new Animated.Value(0);
    this.scrollview = null;
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
        onLongPressLeft={() => navigation.popToTop()}
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
      const { navigation } = this.props;
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
          <Image
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
            ref={scrollview => {
              this.scrollview = scrollview;
            }}
            overScrollMode="never"
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
            <GestureRecognizer
              onSwipeUp={() => {
                this.scrollview.scrollTo({
                  x: 0,
                  y: max - headerMinPadding,
                  animated: true,
                });
              }}
              onSwipeDown={() => navigation.goBack()}
              config={{
                velocityThreshold: 0.01,
                gestureIsClickThreshold: 0.1,
                directionalOffsetThreshold: 80,
              }}
              style={StyleConst.absoluteFullScreen}
            >
              {renderImage()}
              {renderTitle()}
              {this.renderBasicHeader()}
            </GestureRecognizer>
          </Animated.View>
        </View>
      );
    } catch (error) {
      return null;
      // console.log(error);
    }
  };

  renderContent = () => {
    const {
      id,
      deckinfo,
      v,
      user,
      layout: { width },
    } = this.state;
    const { navigation } = this.props;
    const renderAttribution = () => {
      if (deckinfo.th.user.name !== 'me') {
        return (
          <TouchableOpacity
            style={style.photographerButton}
            onPress={() => Linking.openURL(deckinfo.th.user.link)}
            pointerEvents="box-none"
          >
            <Text style={{ color: Color.font5 /* textAlign: 'right' */ }}>
              {`Photo by ${deckinfo.th.user.name} / Unsplash`}
            </Text>
          </TouchableOpacity>
        );
      }
      return null;
    };
    const renderDeckButton = () => {
      const buttons = [
        {
          title: 'Play',
          icon: () => <Icon.Feather name="play" style={style.deckButtonIcon} />,
          onPress: () => {
            navigation.navigate('');
          },
        },
        {
          title: 'Edit',
          icon: () => <Icon.Feather name="edit" style={style.deckButtonIcon} />,
          onPress: () => {
            navigation.navigate('deckedit', { id, deckinfo });
          },
        },
        {
          title: 'Bookmark',
          icon: () => (
            <Icon.Feather name="bookmark" style={style.deckButtonIcon} />
          ),
          onPress: () => {
            navigation.navigate('');
          },
        },
        {
          title: 'More',
          icon: () => (
            <Icon.Feather name="chevron-down" style={style.deckButtonIcon} />
          ),
          onPress: () => {
            navigation.navigate('');
          },
        },
      ];
      return buttons.map(button => (
        <TouchableOpacity
          style={[style.deckButton, { height: width * 0.15 }]}
          onPress={button.onPress}
        >
          {button.icon()}
          <Text style={style.deckButtonTitle}>{button.title}</Text>
        </TouchableOpacity>
      ));
    };
    return (
      <View
        style={[
          style.contentContaier,
          {
            borderBottomLeftRadius: width * 0.08,
            borderBottomRightRadius: width * 0.08,
          },
        ]}
      >
        {renderAttribution()}
        <View style={style.deckButtonContainer}>{renderDeckButton()}</View>
        <View style={style.contentContaierSmall}>
          <View style={style.infoContainer}>
            <Text>{deckinfo.ti}</Text>
            <Text>{`${deckinfo.num} words ${v} viewed`}</Text>
            <Text>{`Learn ${deckinfo.lang1} In ${deckinfo.lang2}`}</Text>
          </View>
          <TouchableOpacity
            pointerEvents="box-none"
            onPress={() =>
              navigation.push('usermenu', { user, uid: deckinfo.user })
            }
          >
            <UserIcon style={style.usericon} user={user} size={48} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  componentWillUnmount() {
    bottomRef.setTabVisible({ visible: true });
  }
}

export default DeckMenu;
