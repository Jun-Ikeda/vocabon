import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const style = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
  },
});

class NoMoreCards extends Component {
  render() {
    return (
      <View>
        <Text style={style.noMoreCardssText}>No more cards :(</Text>
      </View>
    );
  }
}

export default NoMoreCards;


//   render() {
//     const { navigation } = this.props;
//     const {} = this.state;
//     return (
//       <View>
//         <Text style={style.noMoreCardssText}>No more cards</Text>
//       </View>
//     );
//   }
// }

// export default NoMoreCards;
//   }

//   render() {
//     const { navigation } = this.props;
//     const {} = this.state;
//     return (
//       <View>
//         <Text style={style.noMoreCardssText}>No more cards</Text>
//       </View>
//     );
//   }
// }

// export default NoMoreCards;
