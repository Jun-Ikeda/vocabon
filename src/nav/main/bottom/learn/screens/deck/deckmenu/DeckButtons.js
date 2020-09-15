import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../../../../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 15,
  },
  icon: {
    fontSize: 20,
  },
});

export default class DeckButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdditionalButtonsVisible: false,
    };
  }

  render() {
    return (
      <View>
        {this.renderMainButtons()}
        {this.renderMoreButtons()}
      </View>
    );
  }

  renderColumn = buttons => {
    const {
      layout: { width },
    } = this.props;
    return (
      <View style={style.container}>
        {buttons.map(button => (
          <TouchableOpacity
            style={[style.button, { height: width * 0.25 }]}
            onPress={button.onPress}
          >
            {button.icon()}
            <Text style={style.title}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  renderMainButtons = () => {
    const { isAdditionalButtonsVisible } = this.state;
    const { id, deckinfo, navigation } = this.props;
    const buttons = [
      {
        title: 'Play',
        icon: () => <Icon.Feather name="play" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckplay', { id, deckinfo });
        },
      },
      {
        title: 'Property',
        icon: () => <Icon.Ionicons name="md-list" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckproperty', { id, deckinfo });
        },
      },
      {
        title: 'Edit',
        icon: () => <Icon.Feather name="edit" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckedit', { id, deckinfo });
        },
      },
      {
        title: isAdditionalButtonsVisible ? 'Close' : 'More',
        icon: () => (
          <Icon.Feather
            name={isAdditionalButtonsVisible ? 'chevron-up' : 'chevron-down'}
            style={style.icon}
          />
        ),
        onPress: () => {
          this.setState(prev => ({
            isAdditionalButtonsVisible: !prev.isAdditionalButtonsVisible,
          }));
        },
      },
    ];
    return this.renderColumn(buttons);
  };

  renderMoreButtons = () => {
    const { isAdditionalButtonsVisible } = this.state;
    const { id, deckinfo, navigation } = this.state;
    const buttons1 = [
      {
        title: 'Bookmark',
        icon: () => <Icon.Feather name="bookmark" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckbookmark', { id, deckinfo });
        },
      },
      {
        title: 'Import',
        icon: () => <Icon.Feather name="download" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckimport', { id, deckinfo });
        },
      },
      {
        title: 'Export',
        icon: () => <Icon.Feather name="upload" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckexport', { id, deckinfo });
        },
      },
      {
        title: 'Duplicate',
        icon: () => <Icon.Feather name="copy" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckduplicate', { id, deckinfo });
        },
      },
    ];
    const buttons2 = [
      {
        title: 'Share',
        icon: () => <Icon.Entypo name="share" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckshare', { id, deckinfo });
        },
      },
      {
        title: 'Test',
        icon: () => <Icon.AntDesign name="checkcircleo" style={style.icon} />,
        onPress: () => {
          navigation.navigate('decktest', { id, deckinfo });
        },
      },
      {
        title: 'Analyze',
        icon: () => <Icon.Entypo name="line-graph" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckanalyze', { id, deckinfo });
        },
      },
      {
        title: 'Delete',
        icon: () => <Icon.Feather name="delete" style={style.icon} />,
        onPress: () => {
          navigation.navigate('deckdelete', { id, deckinfo });
        },
      },
    ];
    if (isAdditionalButtonsVisible) {
      return (
        <View>
          {this.renderColumn(buttons1)}
          {this.renderColumn(buttons2)}
        </View>
      );
    }
    return null;
  };
}
