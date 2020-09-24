import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TagInput from 'react-native-tags-input';
import DeckSwiper from 'react-native-deck-swiper';

import Icon from '../../../../../../../../../components/Icon';

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});

class EachPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: [],
      },
      arraytest: ['', ''],
    };
  }

  render() {
    return (
      <View>
        {this.renderDeckSwiper()}
        {/* {this.renderTextInputs()} */}
        {/* <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          leftElement={<Icon.Ionicons name="md-settings" />}
        />
        <TouchableOpacity onPress={() => console.log(this.state.tags)}>
          <Text>a</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  renderDeckSwiper = () => {
    const { arraytest } = this.state;
    return (
      <DeckSwiper
        cards={arraytest}
        renderCard={(card, index) => (
          <View style={styles.card}>
            <TextInput
              value={arraytest[index]}
              onChangeText={
                text =>
                  this.setState(prev => {
                    const state = prev;
                    state.arraytest[index] = text;
                    this.setState({ arraytest: state.arraytest });
                  })
                /*  */
              }
            />
          </View>
        )}
        onSwiped={cardIndex => {
          console.log(this.state.arraytest);
          this.setState(prev => {
            prev.arraytest.push('');
            return { arraytest: prev.arraytest };
          });
        }}
        onSwipeRight={this.onSwipeRight}
        onSwipeLeft={this.onSwipeLeft}
        onSwipedAll={() => console.log('onSwipedAll')}
        // horizontalThreshold={width / 8}
        cardIndex={0}
        backgroundColor="#4FD0E9"
        ref={swiperRef => {
          this.swiperRef = swiperRef;
        }}
        stackSize={1}
        cardVerticalMargin={20}
        useViewOverflow={false}
      />
    );
  };

  renderTextInputs = () => {
    const {
      page: { word, def, eg, syn, ant, cf },
      setState,
    } = this.props;
    const inputs = [
      { title: 'Word', setState: word => setState({ word }), value: word },
      {
        title: 'Definition',
        setState: def => setState({ def }),
        value: def,
      },
      { title: 'Example', setState: eg => setState({ eg }), value: eg },
      { title: 'Synonym', setState: syn => setState({ syn }), value: syn },
      { title: 'Antonyms', setState: ant => setState({ ant }), value: ant },
      { title: 'cf', setState: cf => setState({ cf }), value: cf },
    ];
    return inputs.map(input => (
      <View style={style.inputContainer}>
        <Text>{input.title}</Text>
        <TextInput onChangeText={input.setState} value={input.value} />
      </View>
    ));
  };

  updateTagState = state => {
    this.setState({
      tags: state,
    });
  };
}

export default EachPage;
