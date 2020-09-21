import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TagInput from 'react-native-tags-input';
import HeaderWithBack from '../../../../../../../components/header/HeaderWithBack';
import Color from '../../../../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background2,
  },
  textBox: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderColor: Color.font2,
    borderWidth: 1,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 5,
    alignSelf: 'stretch',
  },
});

class DeckPropertyTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: [],
      },
    };
  }

  updateTagState = (state) => {
    this.setState({
      tags: state,
    });
  };

  render() {
    const { navigation } = this.props;
    const { tags } = this.state;
    return (
      <View style={style.container}>
        <HeaderWithBack
          navigation={navigation}
          title="Tags"
        />
        <Text> This is editing tags screen! </Text>
        <Text>
          文字数:
          {this.state.count}
        </Text>
        <View style={style.textBox}>
          <TagInput
            style={style.input}
            updateState={this.updateTagState}
            tags={tags}
          />
        </View>
      </View>
    );
  }
}

export default DeckPropertyTags;
