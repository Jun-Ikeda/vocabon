import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Color from '../../../../../../../config/Color';
import { Functions } from '../../../../../../../config/Const';

import Header from '../../../../../../../components/header/Header';
import Icon from '../../../../../../../components/Icon';
// import ItemWithIcon from '../../../../../../../components/item/ItemWithIcon';
import Deck from '../../../../../../../config/Firebase/Deck';
import DeckPropertyItem from './DeckPropertyItem';

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
    // justifyContent: 'space-between',
    marginVertical: 50,
    marginHorizontal: 30,
    // borderWidth: 2,
    // borderColor: 'white',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
    // paddingTop: 20,
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
    const {} = this.state;
    const id = navigation.getParam('id');
    const deckinfo = navigation.getParam('deckinfo');
    this.setState({ id, deckinfo });
    console.log({ id, deckinfo });
  }

  render() {
    const { navigation } = this.props;
    const {} = this.state;
    return (
      <View style={style.container}>
        <Header
          renderLeft={() => (
            <Icon.Ionicons name="ios-arrow-back" style={style.headerIcon} />
          )}
          renderTitle={() => <Text style={style.title}>Property</Text>}
          onPressLeft={this.goBack}
        />
        {this.renderItems()}
        {/* {this.renderEditContent()} */}
      </View>
    );
  }

  renderItems = () => {
    const { id, deckinfo } = this.state;
    const { navigation } = this.props;
    return (
      <View style={style.itemsContainer}>
        <DeckPropertyItem
          title="Title"
          titleStyle={style.titleStyle}
          onPress={() =>
            navigation.navigate('deckpropertytitle', {
              ti: deckinfo.ti,
              updateDeckInfo: this.updateDeckInfo.bind(this),
            })
          }
          containerStyle={style.itemContainer}
          icon={{
            collection: 'MaterialCommunityIcons',
            name: 'format-title',
          }}
          iconStyle={style.iconStyle}
          descriptionBelow={deckinfo.ti}
          descBStyle={style.descBStyle}
          BelowStyle={style.BelowStyle}
        />
        <DeckPropertyItem
          title="Style"
          titleStyle={style.titleStyle}
          onPress={() => console.log('STYLE')}
          containerStyle={style.itemContainer}
          icon={{
            collection: 'Foundation',
            name: 'page-edit',
          }}
          iconStyle={style.iconStyle}
          descriptionBelow="Style"
          descBStyle={style.descBStyle}
          BelowStyle={style.BelowStyle}
        />
        <DeckPropertyItem
          title="Tags"
          titleStyle={style.titleStyle}
          onPress={() => console.log('TAGS')}
          containerStyle={style.itemContainer}
          icon={{
            collection: 'Ionicons',
            name: 'md-pricetags',
          }}
          iconStyle={style.iconStyle}
          descriptionBelow="Tags"
          descBStyle={style.descBStyle}
          BelowStyle={style.BelowStyle}
        />
        {/*
        <ItemWithIcon
          title="Tags"
          onPress={this.returnTags}
          titleStyle={style.titleStyle}
          icon={{
            collection: 'Ionicons',
            name: 'md-pricetags',
          }}
          containerStyle={style.itemContainer}
        /> */}
      </View>
    );
  };

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
    // const { deckinfo } = this.state;
    // const merged = Functions.deepMerge(deckinfo, newDeckinfo)
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

  // renderEditContent = () => {
  //   const { id, deckinfo } = this.state;
  //   const { navigation } = this.props;
  //   return (
  //     <TouchableOpacity onPress={() => navigation.navigate('deckeditcontent', { id, deckinfo })}>
  //       <Text>Edit Content</Text>
  //     </TouchableOpacity>
  //   );
  // }
}

export default DeckProperty;