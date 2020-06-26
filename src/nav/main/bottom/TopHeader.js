import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

import Color from '../../../config/Color';
// import Storage from '../../../config/Storage';
// import User from '../../../config/Firebase/User';

import Header from '../../../components/Header';
import Icon from '../../../components/Icon';
// import UserIcon from '../../../components/UserIcon';

import { bottomRef } from './BottomNav';

const style = StyleSheet.create({
  headerTitle: {
    color: Color.font1,
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    // padding: 20,
  },
  headerIcon: {
    fontSize: 25,
    color: Color.font3,
    // alignSelf: 'center',
  },
  userIcon: {
    // alignSelf: 'center',
  },
});

class TopHeadeer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     myAccount: { name: 'a', background: 'white' },
  //     auth: { uid: '' },
  //   };
  // }

  async UNSAFE_componentWillMount() {
    // const { icon } = this.props;
    // if (icon) {
    //   await Storage.Function.load({ key: 'auth' }).then(async auth => {
    //     await this.setState({ auth });
    //     await User.load({ uid: auth.uid, expires: null }).then(user => {
    //       this.setState({ myAccount: user });
    //     });
    //   });
    // }
  }

  render() {
    const { title, onPressRight, renderRight } = this.props;
    // const {
    //   myAccount,
    //   auth: { uid },
    // } = this.state;
    return (
      <Header
        large
        titleStyle={style.headerTitleContainer}
        renderTitle={() => <Text style={style.headerTitle}>{title}</Text>}
        renderLeft={() => (
          <Icon.Ionicons name="md-menu" style={style.headerIcon} />
        )}
        onPressLeft={this.onPressMenu}
        renderRight={renderRight}
        onPressRight={onPressRight}
      />
    );
  }

  onPressMenu = () => {
    bottomRef.openDrawer();
  };
}

export default TopHeadeer;
