// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Color from '../../../../../../../../../config/Color';

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   noMoreCardsText: {
//     fontSize: 22,
//   },
//   messageContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   button: {
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Color.primary1,
//     height: 40,
//     width: 150,
//     borderRadius: 20,
//     padding: 10,
//   },
//   text: {
//     color: Color.font1,
//     fontSize: 16,
//   },
// });

// class NoMoreCards extends Component {
//   render() {
//     const { navigation } = this.props;
//     return (
//       <View style={style.container}>
//         <View style={style.messageContainer}>
//           <Text style={style.noMoreCardssText}>Congratulations</Text>
//           <Text style={style.noMoreCardssText}>
//             You&aposve finished all the cards!
//           </Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={style.button}
//         >
//           <Text style={style.text}>End</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// export default NoMoreCards;
