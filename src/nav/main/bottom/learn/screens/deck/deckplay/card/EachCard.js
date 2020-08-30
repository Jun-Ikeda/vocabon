import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardFlip from 'react-native-card-flip';

import { Functions } from '../../../../../../../../config/Const';

const style = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
});

class EachCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount() {
  }

  render() {
    // const { layout } = this.state;
    // const { height, width } = layout;
    const { word, def } = this.props;
    return (
      <CardFlip
        style={style.cardflip}
        ref={card => {
          this[`card${word}`] = card;
        }}
        onLayout={e =>
          this.setState({ layout: Functions.onLayoutContainer(e) })
        }
      >
        <TouchableOpacity
          style={[style.card, { height: 300, width: 300 }]}
          onPress={
            () => this[`card${word}`].flip()
          }
        >
          <Text style={style.label}>{word}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.card, { height: 300, width: 300 }]}
          onPress={
            () => this[`card${word}`].flip()
          }
        >
          <Text style={style.label}>{def}</Text>
        </TouchableOpacity>
      </CardFlip>
    );
  }
}

export default EachCard;
