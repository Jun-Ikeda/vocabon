import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Color from '../../../../../../../../config/Color';
import { Functions } from '../../../../../../../../config/Const';

import Header from '../../../../../../../../components/header/Header';
import Icon from '../../../../../../../../components/Icon';
import Deck from '../../../../../../../../config/Firebase/Deck';
import DeckPropertyItem from './Item';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background2,
  },
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
  title: {
    // fontWeight: '700',
  },
  itemName: {
    flexDirection: 'row',
  },
  titleStyle: {
    color: Color.font2,
  },
  descBStyle: {
    color: Color.font6,
    fontSize: 15,
    paddingLeft: 30,
  },
  BelowStyle: {
    flex: 1,
  },
  itemsContainer: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 30,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
    paddingLeft: 35,
    backgroundColor: Color.background5,
    borderRadius: 10,
  },
  iconStyle: {
    color: Color.font2,
    fontSize: 25,
  },
  buttonIcon: {
    fontSize: 20,
    paddingHorizontal: 50,
    color: Color.background4,
  },
  containerLine: {
    paddingVertical: 10, // 固定値だから変える
    flexDirection: 'row', // 縦に並べるやつ
  },
});

class DeckProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      deckinfo: {},
      isupdated: false,
    };
  }

  UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    // const {} = this.state;
    const id = navigation.getParam('id');
    const deckinfo = navigation.getParam('deckinfo');
    this.setState({ id, deckinfo });
    console.log({ id, deckinfo });
  }

  render() {
    // const { navigation } = this.props;
    // const {} = this.state;
    return (
      <View style={style.container}>
        <Header
          renderLeft={() => (
            <Icon.Ionicons name="ios-arrow-back" style={style.headerIcon} />
          )}
          renderTitle={() => <Text style={style.title}>Property</Text>}
          onPressLeft={this.goBack}
        />
        {this.renderButtons()}
      </View>
    );
  }

  renderButtons =() => {
    const { navigation } = this.props;
    const { deckinfo } = this.state;
    const buttons = [
      {
        title: 'Title',
        onPress: () => {
          navigation.navigate('title', {
            ti: deckinfo.ti,
            updateDeckInfo: this.updateDeckInfo.bind(this),
          });
        },
        icon: {
          collection: 'MaterialCommunityIcons',
          name: 'format-title',
        },
        descriptionBelow: deckinfo.ti,
      },
      {
        title: 'Style',
        onPress: () => console.log('STYLE'),
        icon: {
          collection: 'Foundation',
          name: 'page-edit',
        },
        descriptionBelow: 'Style',
      },
      {
        title: 'Tags',
        onPress: () => navigation.navigate('tags'),
        icon: {
          collection: 'Ionicons',
          name: 'md-pricetags',
        },
        descriptionBelow: 'Tags',
      },
    ];
    return this.renderItems(buttons);
  }

  renderItems = items => (
    <View style={style.itemsContainer}>
      {items.map(button => (
        <DeckPropertyItem
          title={button.title}
          titleStyle={style.titleStyle}
          onPress={button.onPress}
          containerStyle={style.itemContainer}
          icon={button.icon}
          iconStyle={style.iconStyle}
          descriptionBelow={button.descriptionBelow}
          descBStyle={style.descBStyle}
          BelowStyle={style.BelowStyle}
          containerLine={style.containerLine}
        />
      ))}
    </View>
  );

  returnTags = () => {
    const { deckinfo } = this.state;
    const tags = Object.keys(deckinfo.tag);
    // const tags = Object.keys(deckinfo.tag).reduce((a, b) => `${a}, ${b}`, '');
    console.log(tags);
    const tagString = tags.reduce((a, b) => `${a}, ${b}`, '').slice(2);
    return <Text>{tagString}</Text>;
  };

  returnSampleWord = () => {
    const {
      deckinfo: { smp },
    } = this.state;
    return smp.map(word => (
      <View>
        <Text>{word.i1}</Text>
        <Text>{word.i2}</Text>
      </View>
    ));
  };

  updateDeckInfo = newDeckinfo => {
    this.setState(({ deckinfo }) => {
      const mergedDeckInfo = Functions.deepMerge(deckinfo, newDeckinfo);
      return { deckinfo: mergedDeckInfo };
    });
    this.setState({ isupdated: true });
  };

  goBack = async () => {
    const { isupdated, id, deckinfo } = this.state;
    const { navigation } = this.props;
    if (isupdated) {
      await Deck.save({ deckid: id, data: deckinfo });
    }
    navigation.goBack();
  };
}

export default DeckProperty;
