import UUID from '../UUID';
import { /* firestore, */ storage, /* database, */ Function } from './Firebase';
import User from './User';
import { Functions } from '../Const';
import Storage from '../Storage';
// import { getRandomImage } from '../Unsplash';

const create = async ({ title, learn, understand }) => {
  const auth = await Storage.Function.load({ key: 'auth' });
  const deckid = UUID.generate();
  let card = '';
  await storage
    .ref(`Deck/${deckid}.json`)
    .put(
      new Blob([JSON.stringify(cardData)], {
        type: 'application/json',
      }),
    )
    .then(async () => {
      card = await storage.ref(`Deck/${deckid}.json`).getDownloadURL();
    })
    .catch(() => null /* console.log(error) */);
  // const up = Date.now();
  const deckData = {
    num: 0,
    smp: [],
    style: 0,
    th: { uri: '', user: { name: '', link: '' } },
    tag: {},
    ti: title,
    lang1: learn,
    lang2: understand,
    user: auth.uid,
    card,
  };
  const cardData = [];

  await save({ deckid, data: deckData, expires: null, merge: false });
  await Function.v.init({ collection: 'Deck', id: deckid });
  await Function.rate.init({ collection: 'Deck', id: deckid });

  await User.save({
    uid: auth.uid,
    data: {
      local: { decks: Functions.mapPush({ newData: { [deckid]: true } }) },
    },
    expires: null,
  });

  return deckid;
  // Function.array.add({
  //   collection: 'User',
  //   id: auth.uid,
  //   path: data => ({ local: { decks: data } }),
  //   data: deckid,
  //   callback: prev => {
  //     console.log({ prev });
  //     const array = prev.data.local.decks;
  //     array.push(deckid);
  //     return { data: { local: { decks: array } } };
  //   },
  //   expires: null,
  // });
  // Storage.Function.transaction({
  //   key: 'User',
  //   id: auth.uid,
  //   callback: prev => {
  //     const array = prev.local.decks;
  //     array.push(deckid);
  //     return array;
  //   },
  //   expires: null,
  // });
  // Function.up.update({ collection: 'User', id: auth.uid });
};

const update = ({ deckid, updated, expires }) =>
  Function.update({ collection: 'User', id: deckid, expires, updated });

const save = async ({ deckid, data, merge = true, expires = false }) => {
  const params = { collection: 'Deck', id: deckid, data, merge };
  const param = expires === false ? { ...params } : { ...params, expires };
  // console.log({ param });
  await Function.save(param);
  /* collection,
  id,
  data,
  merge = true,
  expires = false, */
};

const load = async ({ deckid, expires = false }) => {
  const result = await Function.load({
    collection: 'Deck',
    id: deckid,
    expires,
  });
  return result;
};

const loadAll = async ({ ids, expires = false }) => {
  const array = [];
  for (const child in ids) {
    if (child) {
      const data = await load({ deckid: child, expires });
      array.push({ [child]: data });
    }
  }
  return array;
};

const setListenerV = ({ deckid, callback }) => {
  Function.v.setListener({ collection: 'Deck', id: deckid, callback });
};

const loadV = async ({ deckid }) =>
  Function.v.load({ collection: 'Deck', id: deckid });

export default { create, save, update, load, setListenerV, loadAll, loadV };
