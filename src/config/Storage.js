import { AsyncStorage } from 'react-native';
import StorageOriginal from 'react-native-storage';

import { Functions } from './Const';

const Storage = new StorageOriginal({
  size: 500,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 1,
  enableCache: true,
  sync: {
    isInitialized() {
      Function.init({ key: null });
    },
    User() {
      return false;
    },
    Deck() {
      return false;
    },
    Style() {
      return false;
    },
    Word() {
      return false;
    },
  },
});

const KeyOnlyInitData = [
  { key: 'isInitialized', data: true, expires: null },
  { key: 'readme', data: false, expires: null },
  {
    key: 'auth',
    data: {
      email: '',
      uid: '',
      password: '',
      loggedin: false,
      emailverified: false,
    },
    expires: null,
  },
  { key: 'timerLimit', data: 0, expires: null },
];

const Function = {
  init: async ({ key = null }) => {
    // console.log('Storage.init()');
    if (key === null) {
      // console.log('key is null');
      await AsyncStorage.clear();
      for (let i = 0; i < KeyOnlyInitData.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await Storage.save(KeyOnlyInitData[i]);
      }
    } else {
      const param = KeyOnlyInitData.filter(param => param.key === key);
      // console.log({ param });
      await Storage.save(param[0]);
    }
    // console.log(`Storage.init() ends`);
  },

  load: async ({ key, id = null }) => {
    // console.log(`Storage.load({key: ${key}, id: ${id}}) starts`);
    const KeyOnly = KeyOnlyInitData.map(data => data.key);
    const params = KeyOnly.includes(key) ? { key } : { key, id };
    const result = await Storage.load(params);
    // console.log('local loaded ', { key, id, data: result });
    return result;
  },

  save: async ({ key, id = null, data, merge = true, expires = false }) => {
    const KeyOnly = KeyOnlyInitData.map(data => data.key);
    const params = KeyOnly.includes(key) ? { key, expires: null } : { key, id };
    const param = expires === false ? { ...params } : { ...params, expires };
    let result;
    if (merge) {
      const prevData = await Function.load({ key, id });
      result = await Functions.deepMerge(prevData, data);
    } else {
      result = data;
    }
    /* if (KeyOnly.includes(key)) {
      params = { key, expires: null };
    } else {
      params = { key, id };
    } */
    await Storage.save({ ...param, data: result });
    // console.log('local saved ', { key, id, data: result });
    if (expires === false) {
      // console.log('expires in a day');
    } else if (expires === null) {
      // console.log('never expires');
    } else {
      // console.log(`expires in ${expires} ms `);
    }
  },

  remove: async ({ key, id = null }) => {
    const KeyOnly = KeyOnlyInitData.map(data => data.key);
    const params = KeyOnly.includes(key) ? { key } : { key, id };
    await Storage.remove(params);
    // console.log('local removed ', { key, id });
  },

  transaction: async ({ key, id, callback, expires, merge = true }) => {
    // console.log(`Storage.transaction({key: ${key}, id: ${id}}) starts`);
    const KeyOnly = KeyOnlyInitData.map(data => data.key);
    const params = KeyOnly.includes(key) ? { key } : { key, id };
    const data = await Storage.load(params);
    const result = callback(data);
    Function.save({ key, id, data: result, expires, merge });
    // console.log(`Storage.transaction({key: ${key}, id: ${id}}) is ends`);
  },
};

export default { Storage, Function };

// import { AsyncStorage } from 'react-native';
// import storage from 'react-native-storage';

// import State from './State';
// import initState from './initState';
// import { Functions } from './Const';

// const Storage = new storage({
//   storageBackend: AsyncStorage,
// });

// export default Storage;

// export const StateStorage = {
//   save: async ({ key, data, merge }) => {
//     if (merge) {
//       State[key] = Functions.deepMerge(State[key], data);
//     } else {
//       State[key] = await data;
//     }
//     await Storage.save({ key: key, data: State[key] });
//   },
//   remove: async ({ key }) => {
//     // console.log('in remove(), data is ' + initState[key]);
//     // console.log('in remove(), key is ' + key);
//     await StateStorage.save({ key: key, data: initState[key], merge: false });
//   },
//   init: async ({ key }) => {
//     // console.log('StateStorage.init() is called');
//     await StateStorage.remove({ key });
//     // console.log('StateStorage.init() ended');
//   },
//   load: async ({ key }) => {
//     return State[key];
//   },

//   loadStorage: async ({ key }) => {
//     let data = await Storage.load({ key });
//     StateStorage.save({ key, data, merge: false });
//   },
// };
