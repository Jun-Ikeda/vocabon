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

import Header from '../../../../../../../components/Header';
import Icon from '../../../../../../../components/Icon';
import Deck from '../../../../../../../config/Firebase/Deck';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
  },
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
  itemName: {
    flexDirection: 'row',
  },
});

class DeckEdit extends Component {
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
          renderTitle={() => <Text>Edit</Text>}
          onPressLeft={this.goBack}
        />
        {this.renderItems()}
      </View>
    );
  }

  renderItems = () => {
    const { id, deckinfo } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('deckedittitle', {
              ti: deckinfo.ti,
              updateDeckInfo: this.updateDeckInfo.bind(this),
            })
          }
          style={style.itemName}
        >
          <Text>Title</Text>
          <Text>{deckinfo.ti}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tag</Text>
          {this.returnTags()}
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Sample word</Text>
          {this.returnSampleWord()}
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate('addwords', { deckid: id , uri: deckinfo.card })
          }
        >
          <Text>Add words</Text>
          <Text>{`${deckinfo.num} words`}</Text>
        </TouchableOpacity> */}
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
}

export default DeckEdit;
