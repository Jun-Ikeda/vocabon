import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from '../../../../../../components/Icon';
import Color from '../../../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
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
        <Text>This is DeckEdit screen!</Text>
        {this.renderItems()}
      </View>
    );
  }

  renderItems = () => {
    const { id, deckinfo } = this.state;
    return (
      <View>
        <TouchableOpacity style={style.itemName}>
          <Text>Title</Text>
          <Text>{deckinfo.ti}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tag</Text>
          <Text>{this.returnTags()}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Sample word</Text>
          <Text>{this.returnSampleWord()}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  returnTags = () => {
    const { deckinfo } = this.state;
    const tags = Object.keys(deckinfo.tag).reduce((a, b) => `${a}, ${b}`, '');
    return tags;
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
}

export default DeckEdit;
