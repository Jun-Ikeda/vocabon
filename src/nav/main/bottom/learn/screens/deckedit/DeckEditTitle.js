import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Color from '../../../../../../config/Color';

import Header from '../../../../../../components/Header';
import Icon from '../../../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background1,
  },
  headerIcon: {
    color: Color.font2,
    fontSize: 25,
  },
});

class DeckInfoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    const { navigation } = this.props;
    const { title } = this.state;
    return (
      <View style={style.container}>
        <Header
          renderLeft={() => (
            <Icon.Ionicons name="ios-arrow-back" style={style.headerIcon} />
          )}
          renderTitle={() => <Text>Test</Text>}
          onPressLeft={() => navigation.goBack()}
        />
        <TextInput
          value={title}
          onChangeText={title => this.setState({ title })}
        />
        <TouchableOpacity onPress={this.save}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  save = () => {
    const { title } = this.state;
    const { navigation } = this.props;
    const updateDeckInfo = navigation.getParam('updateDeckInfo');
    updateDeckInfo({ ti: title });
    navigation.goBack();
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ title: navigation.getParam('ti') });
  }
}

export default DeckInfoInput;
