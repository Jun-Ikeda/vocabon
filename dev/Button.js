/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { AsyncStorage /* , Linking */ } from 'react-native';

import Storage from '../src/config/Storage';
import { Function, firestore } from '../src/config/Firebase/Firebase';
// import { } from '../'
import UUID from '../src/config/UUID';

import { TimerProcess } from '../src/components/Timer';
import User from '../src/config/Firebase/User';
import Deck from '../src/config/Firebase/Deck';
import Unsplash, {
  /* getRandomImage,  */ toJson,
} from '../src/config/Unsplash';
import { Functions } from '../src/config/Const';

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
      console.log(data.ti);
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
      Unsplash.search
        .users('Masataka Suzuki', 1)
        .then(toJson)
        .then(json => {
          // Your code
          console.log(json);
        });
    },
  },
  {
    title: 'Linking',
    onPress: async () => {
      const id = UUID.generate();
      console.log({ id });
    },
  },

  {
    title: 'CurrentUser',
    onPress: async () => {
      const user = await User.authentication.getCurrentUser();
      console.log({ user });
    },
  },
  {
    title: 'Card.load',
    onPress: () => {
      Deck.Card.load({
        uri:
          'https://firebasestorage.googleapis.com/v0/b/vocabon02.appspot.com/o/Deck%2F%26xG04nlKZM.json?alt=media&token=72ef862e-31bf-4190-81af-994ffe682996',
      });
    },
  },
  {
    title: 'Ikeda Test',
    onPress: async () => {
      // auth情報をローカルのStorageから取得
      // authは基本的には更新されないものなので、Firabaseから取ってくることはない
      const auth = await Storage.Function.load({ key: 'auth' });
      console.log(auth);

      // User情報をローカルのStorageから取得
      // User情報は、UID[ユーザーのID]を指定すれば自分以外も読み込める。
      /* const userI = await Storage.Function.load({ key: 'User', id: auth.uid });
      console.log(userI); */

      // User情報を、最終更新まで追い付いていたらローカルから読み、新しい更新があった、もしくは一度も読み込んだことがない場合はFirestoreから読む（ローカルの更新もする）
      const userII = await User.load({ uid: auth.uid });
      console.log(userII);

      // Deck情報をローカルのStorageから取得
      // Deck情報は、deckid[デッキのID]を指定すればなんでも読める
      // const Deck  = await Storage.Function.load({key: 'Deck', id: 保留}),
      // console.log(Deck);

      // Deck情報を、最終更新まで追い付いていたらローカルから読み、新しい更新があった、もしくは一度も読み込んだことがない場合はFirestoreから読む（ローカルの更新もする）
      const deckII = await Deck.load({
        deckid: Object.keys(userII.local.decks)[0],
      });
      console.log(deckII);
    },
  },

  {
    title: 'Edit User Ikeda',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });

      User.save({ uid: auth.uid, data: { background: '#3d7a4e' } });
    },
  },

  {
    title: 'Edit Deck Ikeda',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });
      const user = await User.load({ uid: auth.uid });

      Deck.save({
        deckid: Object.keys(user.local.decks)[3],
        data: { ti: 'Renamed by Ikeda' },
      });
    },
  },

  {
    title: 'Suzuki Test',
    onPress: async () => {
      // auth情報をローカルのStorageから取得
      // authは基本的には更新されないものなので、Firabaseから取ってくることはない取得
      // await使うのにはasyncを書く必要
      const auth = await Storage.Function.load({ key: 'auth' });
      console.log(auth);

      // // User情報をローカルのStorageから取得
      // // User情報は、UID[ユーザーのID]を指定すれば自分以外も読み込める。
      // const user = await Storage.Function.load({ key: 'User', id: auth.uid });
      // console.log(user);

      // 上の関数ではなく下の関数を使う

      // User情報を、最終更新まで追い付いていたらローカルから読み、新しい更新があった、もしくは一度も読み込んだことがない場合はFirestoreから読む（ローカルの更新もする）
      const userII = await User.load({ uid: auth.uid });
      console.log(userII);

      const deckII = await Deck.load({
        deckid: Object.keys(userII.local.decks)[0],
      });
      console.log(deckII);
    },
  },

  {
    title: 'Edit User Suzuki',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });

      User.save({ uid: auth.uid, data: { background: 'blue' } });
    },
  },

  {
    title: 'Edit Deck Suzuki',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });
      const user = await User.load({ uid: auth.uid });

      Deck.save({
        deckid: Object.keys(user.local.decks)[0],
        data: { ti: 'Renamed by Suzuki' },
      });
    },
  },

  {
    title: 'Kochiya Test',
    onPress: async () => {
      // await使うためにはasyncを書く必要あり
      const auth = await Storage.Function.load({ key: 'auth' });
      // auth情報をローカルのStorageから取得
      // authは基本的には更新されないものなので、Firabaseから取ってくることはないを取得
      console.log(auth);

      const userII = await User.load({ uid: auth.uid });
      console.log(userII);

      const deckII = await Deck.load({
        deckid: Object.keys(userII.local.decks)[0],
      });
      console.log(deckII);
    },
  },

  {
    title: 'Edit User Kochiya',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });

      User.save({ uid: auth.uid, data: { background: 'yellow' } });
    },
  },

  {
    title: 'Edit Deck Kochiya',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });
      const user = await User.load({ uid: auth.uid });

      Deck.save({
        deckid: Object.keys(user.local.decks)[2],
        data: { ti: 'Renamed by Kochiya' },
      });
    },
  },

  {
    title: 'Okuda Test',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });
      console.log(auth);
      /* const user = await Storage.Function.load({ key: 'User', id: auth.uid });
      console.log(user); */
      const UserII = await User.load({ uid: auth.uid });
      console.log(UserII);

      const deckII = await Deck.load({
        deckid: Object.keys(UserII.local.decks)[0],
      });
      console.log(deckII);
    },
  },

  {
    title: 'Edit User Okuda',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });

      User.save({ uid: auth.uid, data: { background: 'maroon' } });
    },
  },

  {
    title: 'Edit Deck Okuda',
    onPress: async () => {
      const auth = await Storage.Function.load({ key: 'auth' });
      const user = await User.load({ uid: auth.uid });

      Deck.save({
        deckid: Object.keys(user.local.decks)[0],
        data: { ti: 'Renamed by Okuda' },
      });
      /*
      local: {
        decks: {
          BaB*dai: true,
          e}dfpso: true
        }
      }

      user.local.decks <=> {
        BaB*dai: true,
        e}dfpso: true
      }

      Object.keys(user.local.decks) => [
        BaB*dai,
        e}dfpso
      ]
      */
    },
  },
  {
    title: 'Deck load',
    onPress: async () => {
      const cards = await Deck.Card.load({
        uri:
          'https://firebasestorage.googleapis.com/v0/b/vocabon02.appspot.com/o/Deck%2FXyQ%3DSdI3k~.json?alt=media&token=29b890b2-9505-47a2-bcc4-68b0cba11f7d',
      });
      console.log(cards);
    },
  },

  {
    title: 'Firebase.read()',
    onPress: () => {
      firestore
        .collection('test')
        .doc('id')
        .get({ source: 'cache' })
        .then(doc => {
          if (doc.exists) {
            console.log(doc.data());
          } else {
            console.log("it doesn't exists");
          }
        })
        .catch(error => console.log(error));
    },
  },
  {
    title: 'objectSort',
    onPress: () => {
      const a = {
        card:
          'https://firebasestorage.googleapis.com/v0/b/vocabon02.appspot.com/o/Deck%2FIq%7Be8XvIF%2B.json?alt=media&token=bedafae4-f8ed-4020-a920-2bd633492348',
        lang1: 'Japanese',
        lang2: 'English',
        num: 0,
        smp: [],
        style: 0,
        tag: { a: true, e: true, b: true, c: true },
        th: {
          uri:
            'photo-1563200663-1406f5f6e542?ixlib=rb-1.2.1&q=80&…ysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzU4MX0',
        },
        ti: 'Deck Renamed',
        user: 'JWo0d8JGD4ehxC1Nsw5kI1nnYbQ2',
      };
      const b = {
        card:
          'https://firebasestorage.googleapis.com/v0/b/vocabon02.appspot.com/o/Deck%2FIq%7Be8XvIF%2B.json?alt=media&token=bedafae4-f8ed-4020-a920-2bd633492348',
        lang1: 'Japanese',
        lang2: 'English',
        num: 0,
        smp: [],
        style: 0,
        tag: { a: true, e: true, b: true, c: true },
        th: {
          uri:
            'photo-1563200663-1406f5f6e542?ixlib=rb-1.2.1&q=80&…ysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzU4MX0',
        },
        ti: 'Deck Renamed',
        user: 'JWo0d8JGD4ehxC1Nsw5kI1nnYbQ2',
      };
      const isEqual = Functions.objectEqual(a, b);
      console.log({ isEqual });
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
