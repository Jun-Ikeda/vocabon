// import { database } from 'firebase';
import { auth, Function } from './Firebase';
import { getRandomPastel } from '../Color';
import Storage from '../Storage';
// import { Functions } from '../Const';

const initDecks = {
  local: {
    decks: {},
    styles: {},
  },
  favorite: {
    decks: {},
    tags: {},
    users: {},
    styles: {},
  },
  recent: {
    decks: {},
    tags: {},
    users: {},
    styles: {},
  },
};

const create = async ({ email, password, name }) => {
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async user => {
      const background = getRandomPastel();
      const { uid } = user.user;

      user.user.updateProfile({ displayName: name });

      await save({
        uid,
        data: { name, background, ...initDecks },
        expires: null,
        merge: false,
      });
      await Function.v.init({ collection: 'User', id: uid });

      const data = {
        email,
        uid,
        password,
        loggedin: true,
        emailverified: false,
      };
      await Storage.Function.save({
        key: 'auth',
        data,
      });
    });
};

const login = async ({ email, password, init = true, callback = () => {} }) => {
  await auth.signInWithEmailAndPassword(email, password).then(async user => {
    const { uid, emailVerified } = user.user;
    console.log('loggedin');

    if (init) {
      await load({ uid, expires: null });

      const data = {
        email,
        uid,
        password,
        loggedin: true,
        emailverified: emailVerified,
      };
      Storage.Function.save({ key: 'auth', data });
    }
    await callback(user);
  });
};

const update = ({ uid, updated, expires }) =>
  Function.update({ collection: 'User', id: uid, updated, expires });

const save = async ({ uid, data, merge = true, expires = false }) => {
  const params = { collection: 'User', id: uid, data, merge };
  const param = expires === false ? { ...params } : { ...params, expires };
  await Function.save(param);
};

const load = async ({ uid, expires = false }) => {
  const result = await Function.load({ collection: 'User', id: uid, expires });
  return result;
};

const sendEmail = async () => {
  auth.currentUser
    .sendEmailVerification()
    .then(async () => console.log('email has been sent'));
};

const remove = async ({ email, password }) => {
  console.log({ email, password });
  await login({
    email,
    password,
    init: false,
    callback: async user => {
      console.log('93');
      const { uid } = user.user;
      await Storage.Function.init({ key: 'auth' });
      await Function.remove({ collection: 'User', id: uid });
      await user.user.delete();
    },
  });
};

const authentication = {
  reload: async () => {
    await auth.currentUser.reload();
  },
  getCurrentUser: () => auth.currentUser,
};

const updateListener = ({ uid, callback }) => {
  Function.up.setListener({ collection: 'User', id: uid, callback });
};

const loadV = async ({ uid }) =>
  Function.v.load({ collection: 'User', id: uid });

export default {
  create,
  update,
  save,
  login,
  load,
  sendEmail,
  remove,
  authentication,
  updateListener,
  loadV,
};
