// import * as firebase from 'firebase';
// import 'firebase/firestore';
// import shortid from 'shortid';

// // import { StateStorage } from './Storage';
// // import { Functions } from './Const';
// // import { getRandomImage } from './Unsplash';
// // import State from './State';

// let vlistenedUsers = [];
// let uplistenedUsers = [];

// const FirebaseConfig = {
//   apiKey: 'AIzaSyAePqLoHJwYgVRxegYmkhu7XI6VkPKZb0c',
//   authDomain: 'vocabon02.firebaseapp.com',
//   databaseURL: 'https://vocabon02.firebaseio.com',
//   projectId: 'vocabon02',
//   storageBucket: 'vocabon02.appspot.com',
//   messagingSenderId: '424728039803',
//   appId: '1:424728039803:web:4bc69213dc2bffbbdeedde',
//   measurementId: 'G-T5YVZFB21P',
// };

// if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

// const database = firebase.database();
// const storage = firebase.storage();
// const auth = firebase.auth();
// const firestore = firebase.firestore();

// // export const fireDatabase = firebase.database();
// // export const fireStorage = firebase.storage();
// // export const fireAuth = firebase.auth();
// // export const fireStore = firebase.firestore();

// export default firebase;

// const isIDexist = ({ data, id }) => {
//   let jsonString = JSON.stringify(data);
//   return jsonString.indexOf(id) > -1;
// };

// const User = {
//   /*
//   data
//   create(({name, color, uid})) own
//   remove(({uid})) own
//   save() own
//   load() any
//   v
//   setListenr({uid}) own
//   get({uid}) once any
//   add({uid}) any
//   */

//   /* create: async ({ name, color, uid, currentTime }) => {
//     console.log('FireObject.User.create() is called');

//     // declare the init User to save
//     let initData = {
//       v: 0,
//       up: currentTime,
//       data: {
//         name: name,
//         color: color,
//         local: {
//           decks: true,
//           styles: true,
//         },
//         favorite: {
//           decks: true,
//           tags: true,
//           users: true,
//         },
//         recent: {
//           decks: true,
//           styles: true,
//         },
//       },
//     };

//     // save init User in firebase database
//     await firebase
//       .database()
//       .ref('/User/' + uid)
//       .set(initData);

//     // save init User in StateStorage
//     let newUser = {};
//     newUser[uid] = initData;
//     StateStorage.save({ key: 'User', data: newUser, merge: true });

//     console.log('FireObject.User.create() ended');
//   }, */
//   create: ({ name, color, uid, currentTime }) => {
//     console.log('FireObject.User.create() is called');

//     let up = Date.now();

//     //declare the init data
//     let initData = {
//       name,
//       color,
//       local: {
//         decks: {},
//         styles: {},
//       },
//       favorite: {
//         decks: {},
//         tags: {},
//         users: {},
//         styles: {},
//       },
//       recent: {
//         decks: {},
//         tags: {},
//         users: {},
//         styles: {},
//       },
//     };

//     firebase.firestore().collection('User').doc(uid).set(initData);
//     firebase
//       .database()
//       .ref('/User/' + uid)
//       .set({ v: 0, up });

//     let newUser = {};
//     newUser[uid] = { up, data: initData };
//     StateStorage.save({ key: 'User', data: newUser, merge: true });

//     console.log('FireObject.User.create() ended');
//   },

//   /* remove: async ({ uid }) => {
//     console.log('FireObject.User.remove() is called');

//     // delete the User data from firebase database
//     await firebase
//       .database()
//       .ref('/User/' + uid)
//       .remove();

//     //delete the User data from StateStorage
//     StateStorage.remove({ key: 'User' });

//     console.log('FireObject.User.remove() ended');
//   }, */
//   remove: async ({ uid }) => {
//     console.log('FireObject.User.remove() is called');

//     // delete the User data from firebase
//     await firebase.firestore().collection('User').doc(uid).delete();
//     await firebase
//       .database()
//       .ref('/User/' + uid)
//       .remove();

//     // delte the User data from StateStorage
//     let UserState = await StateStorage.load({ key: 'User' });
//     delete UserState[uid];
//     StateStorage.save({ key: 'User', data: UserState, merge: false });

//     console.log('FireObject.User.remove() ended');
//   },

//   /* save: ({ uid, data, merge }) => {
//     console.log('FireObject.User.save() is called');

//     // declare the current time
//     let now = Date.now();

//     // save the data to firebase database
//     if (merge) {
//       firebase
//         .database()
//         .ref('/User/' + uid + '/data')
//         .update(data);
//     } else {
//       firebase
//         .database()
//         .ref('/User/' + uid + '/data')
//         .set(data);
//     }
//     firebase
//       .database()
//       .ref('/User/' + uid + '/data')
//       .child('up')
//       .set(now);

//     // save the data to StateStorage
//     let newUser = {};
//     newUser[uid] = { up: now, data };
//     StateStorage.save({ key: 'User', data: newUser, merge });

//     console.log('FireObject.User.save() ended');
//   }, */
//   save: async ({ uid, data, merge = true }) => {
//     console.log('FireObject.User.save() is called');

//     let up = Date.now();

//     await firebase.firestore().collection('User').doc(uid).set(data, { merge });
//     await firebase
//       .database()
//       .ref('/User/' + uid)
//       .update({ up });

//     let newUser = {};
//     newUser[uid] = { up, data };
//     await StateStorage.save({ key: 'User', data: newUser, merge: true });

//     console.log('FireObject.User.save() ended');
//   },
//   /* updateArray: async ({ uid, dataToBeOverwritten, dataToBeAdded }) => {
//     let data = null;
//     switch (dataToBeOverwritten) {
//       case 'local/decks':
//         data = {
//           local: {
//             decks: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'local/styles':
//         data = {
//           local: {
//             styles: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'favorite/decks':
//         data = {
//           favorite: {
//             decks: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'favorite/tags':
//         data = {
//           favorite: {
//             tags: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'favorite/users':
//         data = {
//           favorite: {
//             users: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'favorite/styles':
//         data = {
//           favorite: {
//             styles: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'recent/decks':
//         data = {
//           recent: {
//             decks: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'recent/tags':
//         data = {
//           recent: {
//             tags: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'recent/users':
//         data = {
//           recent: {
//             users: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//       case 'recent/styles':
//         data = {
//           recent: {
//             styles: firebase.firestore.FieldValue.arrayUnion(dataToBeAdded),
//           },
//         };
//         break;
//     }
//     firebase.firestore().collection('User').doc(uid).update(data);
//   }, */
//   /* load: async ({ uid }) => {
//     console.log('FireObject.User.load() is called');

//     // load StateStorage first

//     let UserState = await StateStorage.load({ key: 'User' });
//     let isIDexistInState = isIDexist({ data: UserState, id: uid });
//     let up;
//     await firebase
//       .database()
//       .ref('/User/' + uid + '/up')
//       .once('value', snapshot => {
//         up = snapshot.val();
//       });

//     // declare the function to load firebase and save in StateStorage
//     let loadFirebaseToStateStorage = async () => {
//       await firebase
//         .database()
//         .ref('/User/' + uid + '/data')
//         .once('value', snapshot => {
//           let newUser = {};
//           newUser[uid] = { up, data: snapshot.val() };
//           StateStorage.save({
//             key: 'User',
//             data: newUser,
//             merge: true,
//           });
//         });
//     };

//     if (isIDexistInState) {
//       // when ID exist in State
//       if (!(up == UserState[uid]['up'])) {
//         await loadFirebaseToStateStorage();
//       }
//     } else {
//       // when ID doesn't exist
//       await loadFirebaseToStateStorage();
//     }

//     UserState = StateStorage.load({ key: 'User' });
//     console.log('FireObject.User.load() ended');
//     return UserState[uid]['data'];
//   }, */
//   load: async ({ uid }) => {
//     console.log('FireObject.User.load() is called');
//     console.log({ uid });

//     let UserState = await StateStorage.load({ key: 'User' });
//     let isIDexistInState = isIDexist({ data: UserState, id: uid });
//     let up;
//     await firebase
//       .database()
//       .ref('/User/' + uid + '/up')
//       .once('value', (snapshot) => {
//         up = snapshot.val();
//         console.log(up);
//       });

//     let loadFirebaseToStateStorage = async () => {
//       await firebase
//         .firestore()
//         .collection('User')
//         .doc(uid)
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             console.log(
//               'FireObject.User.load() firestore loaded and doc exists'
//             );
//             let newUser = State.User;
//             newUser[uid] = { up, data: doc.data() };
//             StateStorage.save({
//               key: 'User',
//               data: newUser,
//               merge: true,
//             });
//           }
//         });
//       console.log('loaded');
//     };

//     if (isIDexistInState) {
//       console.log('id exists');
//       // when ID exist in State
//       if (!(up == UserState[uid]['up'])) {
//         await loadFirebaseToStateStorage();
//       } else {
//         console.log('not loaded');
//       }
//     } else {
//       // when ID doesn't exist
//       console.log('id doesnt exist');
//       await loadFirebaseToStateStorage();
//     }

//     UserState = StateStorage.load({ key: 'User' });
//     console.log('FireObject.User.load() ended');
//     return await UserState[uid];
//   },

//   v: {
//     setListener: async ({ uid, duaration, calledback = () => {} }) => {
//       console.log('FireObject.User.v.setListener() is called');
//       await firebase
//         .database()
//         .ref('/User/' + uid + '/v')
//         .on('value', (snapshot) => {
//           calledback();
//           let newUser = {};
//           newUser[uid] = { v: snapshot.val() };
//           StateStorage.save({ key: 'User', data: newUser, merge: true });
//         });
//       vlistenedUsers.push(uid);
//       if (!(duaration == 0)) {
//         setTimeout(() => {
//           User.v.removeListener({ uid });
//         }, duaration);
//       }
//       console.log('FireObject.User.v.setListener() ended');
//     },
//     removeListener: async ({ uid }) => {
//       console.log('FireObject.User.v.removeListener() is called');
//       await firebase
//         .database()
//         .ref('/User/' + uid + '/v')
//         .off('value');
//       vlistenedUsers = vlistenedUsers.filter((eachUid) => eachUid !== uid);
//       console.log('FireObject.User.v.removeListener() ended');
//     },
//     isListened: ({ uid }) => {
//       let islistened = vlistenedUsers.includes(uid);
//       console.log({ islistened });
//       return islistened;
//     },
//     getOnce: async ({ uid }) => {
//       console.log('FireObject.User.v.getOnce() is called');
//       await firebase
//         .database()
//         .ref('/User/' + uid + '/v')
//         .once('value', (snapshot) => {
//           let newUser = {};
//           newUser[uid] = { v: snapshot.val() };
//           StateStorage.save({ key: 'User', data: newUser, merge: true });
//         });
//       console.log('FireObject.User.v.getOnce() ended');
//     },
//     add: async ({ uid }) => {
//       console.log('FireObject.User.v.add() is called');
//       await firebase.database.ref('/User/' + uid + '/v').transaction((v) => {
//         if (v) {
//           v = v + 1;
//         } else {
//           v = 1;
//         }
//         return v;
//       });
//       console.log('FireObject.User.v.add() ended');
//     },
//     allListened: () => {
//       return vlistenedUsers;
//     },
//   },
//   up: {
//     setListener: async ({ uid, duaration, calledback = () => {} }) => {
//       console.log('FireObject.User.up.setListener() is called');

//       uplistenedUsers.push(uid);
//       if (!(duaration == 0)) {
//         setTimeout(() => {
//           User.up.removeListener({ uid });
//         }, duaration);
//       }
//       // await firebase
//       //   .database()
//       //   .ref('/User/' + uid + '/up')
//       //   .on('value', async (snapshot) => {
//       //     calledback()
//       //     await firebase.firestore().
//       //   });
//       await firebase
//         .database()
//         .ref('/User/' + uid + '/up')
//         .on('value', async (snapshot) => {
//           let up = snapshot.val();
//           await firebase
//             .firestore()
//             .collection('User')
//             .doc(uid)
//             .get()
//             .then(async (doc) => {
//               if (doc.exists) {
//                 let newUser = State.User;
//                 newUser[uid] = { up, data: doc.data() };
//                 await StateStorage.save({
//                   key: 'User',
//                   data: newUser,
//                   merge: true,
//                 });
//               }
//             })
//             .then(() => {
//               calledback();
//             });
//         });

//       console.log('FireObject.User.up.setListener() ended');
//     },
//     removeListener: async ({ uid }) => {
//       console.log('FireObject.User.up.removeListener() is called');

//       await firebase
//         .database()
//         .ref('/User/' + uid + '/up')
//         .off('value');
//       uplistenedUsers = uplistenedUsers.filter((eachUid) => eachUid !== uid);
//       console.log('FireObject.User.up.removeListener() ended');
//     },
//     isListened: ({ uid }) => {
//       let islistened = uplistenedUsers.includes(uid);
//       console.log({ islistened });
//       return islistened;
//     },
//     allListened: () => {
//       return uplistenedUsers;
//     },
//   },
// };

// const Deck = {
//   /*
//   create({}) own
//   remove({}) own
//   save({}) own
//   load({deckID}) any
//   */
//   /* load: async ({ deckID }) => {
//     console.log('FireObject.Deck.load() is called');
//     let DeckState = await StateStorage.load({ key: 'Deck' });
//     let isIDexistInState = isIDexist({ data: DeckState, id: deckID });
//     let up;
//     await firebase
//       .database()
//       .ref('/Deck/' + deckID + '/up')
//       .once('value', snapshot => {
//         up = snapshot.val();
//       });

//     let loadFirebaseToStateStorage = async () => {
//       await firebase
//         .firestore()
//         .collection('Deck')
//         .doc('testDeckId')
//         .get()
//         .then(doc => {
//           console.log(doc);
//           if (doc.exists) {
//             let newDeck = {};
//             newDeck[deckID] = { up, data: doc.data() };
//             StateStorage.save({ key: 'Deck', data: newDeck, merge: true });
//           }
//         })
//         .catch(error => console.log(error));
//     };

//     if (isIDexistInState) {
//       if (!(up == DeckState[deckID]['up'])) {
//         loadFirebaseToStateStorage();
//       }
//     } else {
//       loadFirebaseToStateStorage();
//     }

//     DeckState = StateStorage.load({ key: 'Deck' });
//     console.log('FireObject.Deck.load() ended');
//     return DeckState[deckID]['data'];
//   }, */
//   create: async ({ deckid, deck, cards }) => {
//     console.log('FireObject.Deck.create() is called');

//     let up = Date.now();
//     // let cards = data.cards;
//     // let deck = data.deck;

//     // save up in realtime database
//     await firebase
//       .database()
//       .ref('/Deck/' + deckid)
//       .set({ up, v: 0 })
//       .then(() => console.log('database uploaded'))
//       .catch((error) => console.log(error));
//     // save deck information and cards' updated time
//     await firebase
//       .firestore()
//       .collection('Deck')
//       .doc(deckid)
//       .set(deck)
//       .then(() => console.log('firestore uploaded'))
//       .catch((error) => console.log(error));
//     // save cards as a json file
//     await firebase
//       .storage()
//       .ref('Deck/' + deckid + '.json')
//       .put(
//         new Blob([JSON.stringify(cards)], {
//           type: 'application/json',
//         })
//       )
//       .then(() => console.log('storage uploaded'))
//       .catch((error) => console.log(error));

//     let newDeck = {};
//     newDeck[deckid] = { up, deck, cards };
//     await StateStorage.save({ key: 'Deck', data: newDeck, merge: true });

//     console.log('FireObject.Deck.create() ended');
//   },

//   load: async ({ deckid }) => {
//     console.log('FireObject.Deck.load() is called');

//     let DeckState = await StateStorage.load({ key: 'Deck' });
//     let isIDexistInState = isIDexist({ data: DeckState, id: deckid });
//     let up;
//     await firebase
//       .database()
//       .ref('/Deck/' + deckid + '/up')
//       .once('value', (snapshot) => {
//         up = snapshot.val();
//       });

//     let loadFirebaseToStateStorage = async () => {
//       let deck;
//       let cards = [];
//       await firebase
//         .firestore()
//         .collection('Deck')
//         .doc(deckid)
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             deck = doc.data();
//           }
//         })
//         .catch((error) => console.log(error));
//       await firebase
//         .storage()
//         .ref('/Deck/' + deckid + '.json')
//         .getDownloadURL()
//         .then((url) => {
//           fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//               cards = data;
//             });
//         })
//         .catch((error) => console.error(error));
//       let newDeck = State.Deck;
//       newDeck[deckid] = { up, deck, cards };
//       await StateStorage.save({
//         key: 'Deck',
//         data: newDeck,
//         merge: true,
//       });
//     };

//     if (isIDexistInState) {
//       // when ID exist in State
//       if (!(up == DeckState[deckid]['up'])) {
//         await loadFirebaseToStateStorage();
//       }
//     } else {
//       // when ID doesn't exist
//       await loadFirebaseToStateStorage();
//     }

//     DeckState = await StateStorage.load({ key: 'Deck' });
//     console.log('FireObject.Deck.load() ended');
//     return await DeckState[deckid];
//   },
// };

// const Style = {
//   /*
//   create
//   remove
//   load
//   */
// };

// const interpret = {
//   deckData: ({ deckData }) => {
//     let cards = deckData.cards;
//     let up = deckData.up;
//     let deck = deckData.deck;
//     try {
//       deck.th = 'https://source.unsplash.com/' + deck.th + '/';
//     } catch (error) {
//       console.log(error);
//     }
//     return { deck, cards, up };
//   },
// };

// const Materialized = {
//   createWithTitleAndRelatedLanguages: async ({
//     title,
//     learningLanguage,
//     speakingLanguage,
//   }) => {
//     let auth = await StateStorage.load({ key: 'auth' });
//     let id = await getRandomImage({ word: '' });
//     console.log(id);
//     let deckData = {
//       num: 0,
//       smp: [],
//       style: 0,
//       th: id,
//       ti: title,
//       learn: learningLanguage,
//       speak: speakingLanguage,
//       user: auth.uid,
//     };
//     let deckid = shortid.generate();
//     Deck.create({ deckid, deck: deckData, cards: [] });
//     // User.save({
//     //   uid: auth.uid,
//     //   data: { local: { decks: [deckid] } },
//     //   merge: true,
//     // });
//     let decks = {};
//     decks[deckid] = true;
//     User.save({
//       uid: auth.uid,
//       data: { local: { decks: decks } },
//       merge: true,
//     });
//   },

//   setListenerForLocal: async ({ setStateDecks }) => {
//     let AuthState = await StateStorage.load({ key: 'auth' });

//     User.up.setListener({
//       uid: AuthState.uid,
//       duaration: 0,
//       calledback: async () => {
//         let UserState = await StateStorage.load({ key: 'User' });
//         let deckMap = await UserState[AuthState.uid].data.local.decks;
//         let deckArray = await Functions.convertMapIntoArray(deckMap);
//         let array = [];
//         for (let i = 0; i < deckArray.length; i++) {
//           let data = await Deck.load({ deckid: deckArray[i] });
//           await array.push(data);
//         }
//         setStateDecks(array);
//       },
//     });
//   },
// };

// export const FireObject = {
//   User,
//   Deck,
//   Style,
//   Materialized,
//   interpret,
// };
