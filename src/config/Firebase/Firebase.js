/* eslint-disable object-curly-newline */
import * as firebase from 'firebase';
import 'firebase/firestore';

import Storage from '../Storage';

const FirebaseConfig = {
  apiKey: 'AIzaSyAePqLoHJwYgVRxegYmkhu7XI6VkPKZb0c',
  authDomain: 'vocabon02.firebaseapp.com',
  databaseURL: 'https://vocabon02.firebaseio.com',
  projectId: 'vocabon02',
  storageBucket: 'vocabon02.appspot.com',
  messagingSenderId: '424728039803',
  appId: '1:4247280398 03:web:4bc69213dc2bffbbdeedde',
  measurementId: 'G-T5YVZFB21P',
};

if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

const database = firebase.database();
const storage = firebase.storage();
const auth = firebase.auth();
const firestore = firebase.firestore();

const load = async ({ collection, id, expires }) => {
  const data = await Storage.Function.load({ key: collection, id });
  const updated = await up.load({ collection, id });
  let result;

  // console.log({ data, updated, up: data.up });
  if (data && updated === data.up) {
    console.log(`not loaded { collection: ${collection}, id: ${id} }`);
    result = data.data;
  } else {
    console.log(`loaded { collection: ${collection}, id: ${id} }`);
    // console.log('updated');
    result = await update({ collection, id, updated, expires });
  }
  // console.log(`Firebase.load({collection: ${collection}, id: ${id}}) ends`);
  return result;
};

const update = async ({ collection, id, updated, expires }) => {
  // console.log(`Firebase.update({collection: ${collection}, id: ${id})`);
  const result = await firestore
    .collection(collection)
    .doc(id)
    .get()
    .then(doc => {
      const result = doc.exists ? doc.data() : null;
      // console.log({ result });
      return result;
    });
  await Storage.Function.save({
    key: collection,
    id,
    data: { up: updated, data: result },
    merge: false,
    expires,
  });
  return result;
};

const save = async ({
  collection,
  id,
  data,
  merge = true,
  expires = false,
}) => {
  console.log(`Firebase.save({collection: ${collection}, id: ${id}}) starts`);

  await firestore
    .collection(collection)
    .doc(id)
    .set(data, { merge })
    .then(async () => {
      // console.log('save data!', data);
      const params = { key: collection, id, data: { data }, merge };
      const param = expires === false ? { ...params } : { ...params, expires };
      // console.log({ param });
      await Storage.Function.save(param);
      up.update({ collection, id });
    });

  // console.log(`Firebase.save({collection: ${collection}, id: ${id}}) ends`);
};

const remove = async ({ collection, id }) => {
  await firestore
    .collection(collection)
    .doc(id)
    .delete();
  await database.ref(`${collection}/${id}`).remove();
  Storage.Function.remove({ key: collection, id });
};

/* const array = {
  add: ({ collection, id, path, data, callback, expires }) => {
    // console.log(
    // `Firebase.array.add({collection: ${collection}, id: ${id}}) starts`,
    // );

    firestore
      .collection(collection)
      .doc(id)
      .update(path(firebase.firestore.FieldValue.arrayUnion(data)))
      .then(async () => {
        await Storage.Function.transaction({
          key: collection,
          id,
          callback,
          expires,
        });
        up.update({ collection, id });
        // Storage.Function.transaction({
        //   key: collection,
        //   id
        //   callback: prevData => ({}),
        //   expires,
        // });
        // const params = { key: collection, id, data: { data }, merge };
        // const param =
        // expires === false ? { ...params } : { ...params, expires };
      });
    // console.log(
    // `Firebase.array.add({collection: ${collection}, id: ${id}}) ends`,
    // );
  },
  remove: ({ collection, id, path, data }) => {
    // console.log(
    //   `Firebase.array.remove({collection: ${collection}, id: ${id}}) starts`,
    // );

    firestore
      .collection(collection)
      .doc(id)
      .update(path(firebase.firestore.FieldValue.arrayRemove(data)));

    // console.log(
    // `Firebase.array.remove({collection: ${collection}, id: ${id}}) ends`,
    // );
  },
}; */
const up = {
  update: ({ collection, id }) => {
    // console.log(
    //   `Firebase.up.update({collection: ${collection}, id: ${id}}) starts`,
    // );
    const up = Date.now();
    database.ref(`${collection}/${id}`).update({ up });
    Storage.Function.save({ key: collection, id, data: { up } });
    // console.log(
    // `Firebase.up.update({collection: ${collection}, id: ${id}}) ends`,
    // );
  },
  load: async ({ collection, id }) => {
    // console.log(
    //   `Firebase.up.load({collection: ${collection}, id: ${id}}) starts`,
    // );
    let data;
    await database.ref(`${collection}/${id}/up`).once('value', snapshot => {
      data = snapshot.val();
    });
    // console.log(
    // `Firebase.up.load({collection: ${collection}, id: ${id}}) ends`,
    // );
    return data;
  },
  setListener: ({ collection, id, callback = () => {} }) => {
    database.ref(`/${collection}/${id}/up`).on('value', snapshot => {
      const data = snapshot.val();
      callback(data);
    });
  },
};
const v = {
  init: async ({ collection, id }) => {
    await database.ref(`${collection}/${id}/v`).set(0);
  },
  add: async ({ collection, id }) => {
    // console.log(
    //   `Firebase.v.add({collection: ${collection}, id: ${id}}) starts`,
    // );
    await database.ref(`${collection}/${id}/v`).transaction(v => v + 1);
    // console.log(`Firebase.v.add({collection: ${collection}, id: ${id}}) ends`);
  },
  load: async ({ collection, id }) => {
    // console.log(
    //   `Firebase.v.load({collection: ${collection}, id: ${id}}) starts`,
    // );
    let data;
    await database.ref(`${collection}/${id}/v`).once('value', snapshot => {
      data = snapshot.val();
    });
    // console.log(`Firebase.v.load({collection: ${collection}, id: ${id}}) ends`);
    return data;
  },
  setListener: ({ collection, id, callback = () => {} }) => {
    database.ref(`/${collection}/${id}/v`).on('value', snapshot => {
      const data = snapshot.val();
      callback(data);
    });
  },
};
const rate = {
  init: async ({ collection, id }) => {
    await database.ref(`${collection}/${id}/rate`).set({ sum: 0, num: 0 });
  },
  add: async ({ collection, id, rate }) => {
    // console.log(
    //   `Firebase.v.add({collection: ${collection}, id: ${id}}) starts`,
    // );
    await database.ref(`${collection}/${id}/rate`).transaction(rate => {
      const newSum = rate.sum + rate;
      const newNum = rate.num + 1;
      return { sum: newSum, num: newNum };
    });
    // console.log(`Firebase.v.add({collection: ${collection}, id: ${id}}) ends`);
  },
  load: async ({ collection, id }) => {
    // console.log(
    //   `Firebase.v.load({collection: ${collection}, id: ${id}}) starts`,
    // );
    let data;
    await database.ref(`${collection}/${id}/rate`).once('value', snapshot => {
      data = snapshot.val();
    });
    // console.log(`Firebase.v.load({collection: ${collection}, id: ${id}}) ends`);
    return data;
  },
};

const Function = { load, save, update, remove, /* array, */ up, v, rate };

export default firebase;
export { database, storage, auth, firestore, Function };
