/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { AsyncStorage, Linking } from 'react-native';
import Storage from '../src/config/Storage';
import { Function } from '../src/config/Firebase/Firebase';
import UUID from '../src/config/UUID';

import { TimerProcess } from '../src/components/Timer';
import User from '../src/config/Firebase/User';
import { getRandomImage } from '../src/config/Unsplash';

const Button = [
  {
    title: 'Show Storage',
    onPress: async () => {
      const keys = ['isInitialized', 'readme', 'auth', 'timerLimit'];
      for (const key of keys) {
        // eslint-disable-next-line no-await-in-loop
        const data = await Storage.Function.load({ key });
        console.log({ key, data });
      }
      const KeyIds = ['User', 'Deck', 'Style', 'Word'];
      for (const key of KeyIds) {
        Storage.Storage.getAllDataForKey(key).then(Data => {
          console.log({ key, data: Data });
        });
      }
    },
  },
  {
    title: 'Clear Storage',
    onPress: () => {
      AsyncStorage.clear();
    },
  },
  {
    title: 'Update Storage',
    onPress: async () => {
      Storage.Function.save({
        key: 'auth',
        data: { email: '' },
      });
    },
  },
  {
    title: 'firestore',
    onPress: async () => {
      const data = await Function.load({ collection: 'Deck', id: 'demP-3mL0' });
      alert(data.ti);
    },
  },
  {
    title: 'load',
    onPress: async () => {
      Storage.Function.load({ key: 'Deck', id: 'demP-3mL0' }).then(data => {
        console.log(data);
      });
    },
  },
  {
    title: 'TimerProcess all interval',
    onPress: async () => {
      console.log(await TimerProcess.getIntervalkeys());
    },
  },
  {
    title: 'User.save',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });
      User.save({ uid: auth.uid, data: { color: '' }, expires: null });
    },
  },
  {
    title: 'isColor',
    onPress: () => {
      function isColor(strColor) {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
      }
      console.log({ red: isColor('red') });
      console.log({ green: isColor('green') });
      console.log({ daijfdiaj: isColor('#dfe8f2') });
    },
  },
  {
    title: 'Unsplash',
    onPress: async () => {
      const th = await getRandomImage({ word: '' });
      console.log(th);
    },
  },
  {
    title: 'Linking',
    onPress: async () => {
      const url = 'https://unsplash.com/photos/qInt-Ni5oEQ';
      Linking.openURL(url).catch(err =>
        console.error('URLを開けませんでした。', err),
      );
    },
  },
  {
    title: 'UUID',
    onPress: async () => {
      const id = UUID.generate();
      console.log({ id });
    },
  },
  //   {
  //     title: 'State',
  //     onPress: () => {
  //       for (let child in State) {
  //         console.log({ key: child, data: State[child] });
  //       }
  //     },
  //   },
  //   {
  //     title: 'Storage',
  //     onPress: async () => {
  //       for (let child in initState) {
  //         console.log({ key: child, data: await Storage.load({ key: child }) });
  //       }
  //     },
  //   },
  //   // {
  //   //   title: 'edit Storage temp',
  //   //   onPress: () => {
  //   //     saveStateStorage('test', 'updated');
  //   //   },
  //   // },
  //   {
  //     title: 'Now',
  //     onPress: () => {},
  //   },
  //   {
  //     title: 'deep Merge',
  //     onPress: async () => {
  //       let a = {
  //         dBeEtGNHsigXqsTY5TA9I5aij1I3: {
  //           up: 1590227461487,
  //           data: {
  //             name: 'Vocabon',
  //             color: 'blue',
  //             local: {
  //               decks: true,
  //               style: true,
  //             },
  //             favorite: {
  //               decks: true,
  //               tags: true,
  //               users: true,
  //               styles: true,
  //             },
  //             recent: {
  //               decks: true,
  //               tags: true,
  //               user: true,
  //               styles: true,
  //             },
  //           },
  //         },
  //       };
  //       let b = {
  //         dBeEtGNHsigXqsTY5TA9I5aij1I3: {
  //           up: 1590228407149,
  //           data: { local: { decks: ['test1'] } },
  //         },
  //       };
  //       console.log({ a, b });
  //       let c = await Functions.deepMerge(a, b);
  //       console.log({ c });
  //     },
  //   },
  //   // {
  //   //   title: 'State temp',
  //   //   onPress: () => {
  //   //     State.User['testuid'] = {name: 'test'}
  //   //     console.log(State.User['testuid'])
  //   //   }
  //   // },
  //   {
  //     title: 'FireObject.User temp',
  //     onPress: async () => {
  //       let AuthState = await StateStorage.load({ key: 'auth' });
  //       // FireObject.User.load({ uid: 'dBeEtGNHsigXqsTY5TA9I5aij1I3' });
  //       // FireObject.User.save({
  //       //   uid: AuthState.uid,
  //       //   data: {
  //       //     local: {
  //       //       decks: ['test1', 'test2'],
  //       //     },
  //       //   },
  //       //   merge: true,
  //       // });
  //       // FireObject.User.load({ uid: 'vKk4OXhDMXR6yyqwhf2t8nmtJqy1' });
  //       // await FireObject.User.load({ uid: AuthState.uid });
  //       await FireObject.User.up.setListener({
  //         uid: AuthState.uid,
  //         duaration: 10000,
  //         calledback: () => console.log('updated'),
  //       });
  //     },
  //   },
  //   {
  //     title: 'FireObject.Deck temp',

  //     onPress: async () => {
  //       let AuthState = await StateStorage.load({ key: 'auth' });
  //       // let deck = {
  //       //   lv: 1,
  //       //   num: 5,
  //       //   smp: [
  //       //     {
  //       //       cf: ['exam'],
  //       //       ex: ['test implementation'],
  //       //       i1: 'test',
  //       //       i2: 'テスト',
  //       //     },
  //       //     {
  //       //       cf: ['exam'],
  //       //       ex: ['test implementation'],
  //       //       i1: 'test',
  //       //       i2: 'テスト',
  //       //     },
  //       //   ],
  //       //   style: 'html',
  //       //   th: 'uri',
  //       //   ti: 'Title',
  //       //   user: AuthState.uid,
  //       // };
  //       // let cards = [
  //       //   {
  //       //     cf: ['exam'],
  //       //     ex: ['test implementation'],
  //       //     i1: 'test',
  //       //     i2: 'テスト',
  //       //   },
  //       //   {
  //       //     cf: ['exam'],
  //       //     ex: ['test implementation'],
  //       //     i1: 'test',
  //       //     i2: 'テスト',
  //       //   },
  //       // ];

  //       // FireObject.Deck.create({ deckid: 'testDeckId2', deck, cards });
  //       // FireObject.Deck.load({ deckid: 'testDeckId2' });
  //     },
  //   },
  //   {
  //     title: 'firestore',
  //     onPress: () => {
  //       Firebase.firestore()
  //         .collection('Deck')
  //         .doc('testDeckId')
  //         .get()
  //         .then((snapshot) => {
  //           console.log(snapshot.data());
  //           // if (doc.exist) {
  //           //   console.log(doc.data);
  //           // }
  //         });
  //     },
  //   },
  //   {
  //     title: 'realtime database',
  //     onPress: () => {
  //       Firebase.database()
  //         .ref('/User/' + 'dBeEtGNHsigXqsTY5TA9I5aij1I3')
  //         .update({ up: 1590237533614 });
  //     },
  //   },
  //   {
  //     title: 'if temp',
  //     onPress: () => {
  //       let string = '';
  //       if (!string) {
  //         console.log(true);
  //       } else {
  //         console.log(false);
  //       }
  //     },
  //   },
  //   {
  //     title: 'analyze JSON',
  //     onPress: async () => {
  //       let data = { a: { b: { c: { d: { e: ['aa', 'test'] } } } } };
  //       let plotres = async (response, prefix, depth) => {
  //         for (var key in response) {
  //           if (
  //             typeof response[key] == 'object' &&
  //             !Array.isArray(response[key])
  //           ) {
  //             await plotres(
  //               response[key],
  //               prefix + '{"' + key + '": ',
  //               depth + 1
  //             );
  //           } else {
  //             let close = ' }';
  //             let result =
  //               prefix + '{"' + key + '": ' + response[key] + close.repeat(depth);
  //             console.log({ result });
  //             let json = JSON.parse(result);
  //             console.log({ json });
  //             return result;
  //           }
  //         }
  //       };
  //       let result = await plotres(data, '', 1);
  //     },
  //   },
];

export default Button;
