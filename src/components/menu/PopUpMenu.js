import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { StyleConst } from '../../config/Const';

const style = StyleSheet.create({
  container: {
    ...StyleConst.absoluteFullScreen,
    backgroundColor: 'red',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

class PopUpMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isVisible, renderMenu, overlayStyle, setVisible } = this.props;
    if (isVisible) {
      return (
        <View style={style.container}>
          <TouchableWithoutFeedback
            style={[style.overlay, overlayStyle]}
            onPress={() => setVisible(true)}
          >
            {renderMenu()}
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return null;
  }

  // renderMenu = () => {
  //   const { renderMenu } = this.props;
  //   return;
  //   {
  //     this.renderMenu();
  //   }
  // };
}

PopUpMenu.defaultProps = {
  renderMenu: () => (
    <View style={{ height: 200, width: 150, backgroundColor: 'white' }} />
  ),
};

export default PopUpMenu;
