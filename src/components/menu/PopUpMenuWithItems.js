import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Item from '../item/Item';
import PopUpMenu from './PopUpMenu';

export default class PopUpMenuWithItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <PopUpMenu renderMenu={this.renderItems} />
        );
    }

    renderItems = () => {
        const items = [
            { title: '', onPress: () => { } },
            { title: '', onPress: () => { } },
            { title: '', onPress: () => { } },
        ];
        return items.map(item => (
            <Item {...item} />
        ))
    }
}
