/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { Platform, Dimensions } from 'react-native';

export const HeaderConst = {
  paddingTopByOS: () => {
    switch (Platform.OS) {
      case 'android':
        return 24;
      case 'ios':
        return 18;
      default:
        return 0;
    }
  },
  heightMax: 96,
  heightMin: 48,
};

export const StyleConst = {
  absoluteFullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
};

export const Functions = {
  isPortrait: () => {
    const { height, width } = Dimensions.get('window');
    return height > width;
  },
  returnHyphenBar: num => {
    // console.log();
    let str = '';
    for (let i = 0; i < num; i++) {
      str += '-';
    }
    return str;
  },
  getTime: () => {
    const unix = Date.now();
    const date = new Date(unix);
    const ymd = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    return { time, ymd, unix };
  },
  deepMerge: (target, source) => {
    const isObject = item =>
      item && typeof item === 'object' && !Array.isArray(item);
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) Object.assign(output, { [key]: source[key] });
          else output[key] = Functions.deepMerge(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  },
  convertMapIntoArray: map => {
    const array = [];
    for (const child in map) {
      array.push(child);
    }
    return array;
  },
  isColor: strColor => {
    try {
      return strColor.indexOf('/') === -1;
    } catch (error) {
      return null;
    }
    // const s = new Option().style;
    // s.color = strColor;
    // return s.color !== '';
  },
  mapPush: ({ newData, map = null }) => {
    let data = {};
    if (map === null) {
      data = newData;
    } else {
      data = { ...map, ...newData };
    }
    return data;
  },
};

export const behaviorOfKeyAvoidView = Platform.OS === 'ios' ? 'padding' : null;

export const backgroundImages = [
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
];
