import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import TagInput from 'react-native-tags-input';
import Icon from '../../../../../../../../components/Icon';
import Color from '../../../../../../../../config/Color';
import HeaderWithBack from '../../../../../../../../components/header/HeaderWithBack';

const mainColor = Color.primary6;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  textInput: {
    height: 40,
    borderColor: Color.background2,
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    alignSelf: 'stretch',
    padding: 3,
  },
  taginput: {
    flex: 1,
  },
  tag: {
    backgroundColor: Color.font1,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  tagText: {
    color: mainColor,
  },
  deleteIcon: {
    color: Color.font5,
    fontSize: 25,
  },
});

class DeckTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: [],
      },
      tagsColor: mainColor,
      tagsText: Color.font1,
    };
  }

  updateTagState = state => {
    this.setState({
      tags: state,
    });
  };

  // サイズ系直す
  render() {
    const { tags, tagsColor, tagsText } = this.state;
    return (
      <View style={style.container}>
        {this.renderHeader()}
        <TagInput
          updateState={this.updateTagState}
          tags={tags}
          placeholder="Tags..."
          label="Press space to add a tag"
          labelStyle={{ color: Color.font1 }}
          // leftElement={
          //   <Icon.Ionicons name="md-pricetags" style={style.deleteIcon} />
          // }
          leftElementContainerStyle={{ marginLeft: 3 }}
          containerStyle={style.taginput}
          inputContainerStyle={[
            style.textInput,
            { backgroundColor: tagsColor },
          ]}
          inputStyle={{ color: tagsText }}
          onFocus={() =>
            this.setState({ tagsColor: Color.background2, tagsText: mainColor })
          }
          onBlur={() =>
            this.setState({ tagsColor: mainColor, tagsText: '#fff' })
          }
          autoCorrect={false}
          tagStyle={style.tag}
          tagTextStyle={style.tagText}
          // keysForTag=","
          deleteElement={
            <Icon.Ionicons name="md-close" style={style.deleteIcon} />
          }
        />
      </View>
    );
  }

  renderHeader = () => {
    const { navigation } = this.props;
    return <HeaderWithBack title="Tags" navigation={navigation} />;
  };
}

export default DeckTags;
