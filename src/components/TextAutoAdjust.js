import React, { Component } from 'react';
import { Text } from 'react-native';

class TextAutoAdjust extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = {
      currentFont: style.fontSize,
    };
    this.CopyStyle = JSON.parse(JSON.stringify(style));
    delete this.CopyStyle.height;
    delete this.CopyStyle.width;
    delete this.CopyStyle.fontSize;
  }

  render() {
    const { children, numberOfLines } = this.props;
    const { currentFont } = this.state;
    return (
      <Text
        numberOfLines={numberOfLines}
        adjustsFontSizeToFit
        style={[this.CopyStyle, { fontSize: currentFont }]}
        onTextLayout={e => {
          const { lines } = e.nativeEvent;
          if (lines.length > numberOfLines) {
            this.setState(prev => ({ currentFont: prev.currentFont - 1 }));
          }
        }}
      >
        {children}
      </Text>
    );
  }
}

export default TextAutoAdjust;

// const AdjustLabel = ({ fontSize, text, style, numberOfLines }) => {
//   const [currentFont, setCurrentFont] = useState(fontSize);

//   return (
//     <Text
//       numberOfLines={numberOfLines}
//       adjustsFontSizeToFit
//       style={[style, { fontSize: currentFont }]}
//       onTextLayout={e => {
//         const { lines } = e.nativeEvent;
//         if (lines.length > numberOfLines) {
//           setCurrentFont(currentFont - 1);
//         }
//       }}
//     >
//       {text}
//     </Text>
//   );
// };

// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

// let CopyStyle = null;

// export default class TextAutoAdjust extends Component {
//   /*
//     props: {
//       style: {
//         fontSize < init value
//         width, padding, ...
//       }
//       numberOfLines
//     }
//   */
//   constructor(props) {
//     super(props);
//     const { style } = this.props;
//     this.state = {
//       currentFont: style.fontSize,
//     };
//     CopyStyle = JSON.parse(JSON.stringify(style));
//     delete CopyStyle.height;
//     delete CopyStyle.width;
//     delete CopyStyle.fontSize;
//   }

//   render() {
//     const { currentFont } = this.state;
//     const { style: propsStyle, children } = this.props;
//     return (
//       <View
//         style={{
//           alignSelf: 'center',
//         }}
//       >
//         <Text
//           adjustsFontSizeToFit
//           style={[
//             CopyStyle,
//             { fontSize: currentFont, width: propsStyle.style.width },
//           ]}
//           onLayout={e => {
//             if (e.nativeEvent.layout.height > propsStyle.height) {
//               this.setState(prevState => ({
//                 currentFont: prevState.currentFont - 1,
//               }));
//             }
//           }}
//         >
//           {children}
//         </Text>
//       </View>
//     );
//   }
// }
