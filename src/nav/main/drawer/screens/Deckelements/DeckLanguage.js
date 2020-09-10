import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// import Color from '../../../../../config/Color';

import Header from '../../../../../components/header/Header';
import Icon from '../../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonIcon: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: 'black',
  },
  itemsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 50,
    marginHorizontal: 30,
    // borderWidth: 2,
    // borderColor: 'white',
  },
});

class DeckLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={style.container}>
        <Header
          renderLeft={() => (
            <Icon.Ionicons name="ios-arrow-back" style={style.buttonIcon} />
          )}
          onPressLeft={() => {
            console.log(this.props);
            navigation.goBack();
          }}
        />
        {this.renderItem()}
      </ScrollView>
    );
  }

  renderItem = () => {
    const items = [
      {
        title: 'English',
      },
      {
        title: 'French',
      },
    ];
    return items.map(item => (
      <TouchableOpacity
        style={style.itemContainer}
        onPress={() => {
          const { navigation } = this.props;
          const setState = navigation.getParam('setState');
          setState({ learn: item.title });
        }}
      >
        <Text>{item.title}</Text>
      </TouchableOpacity>
    ));
  };

  //   selectLanguage = () => {
  //     const { navigation } = this.props;
  //     const setState = navigation.getParam('setState');
  //     setState({learn: })
  //   };
}

export default DeckLanguage;
