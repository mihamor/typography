import firebase from 'firebase/app';
import 'firebase/firestore';

let db = null;
let auth = null;

class DB {
  static initializeApp(config) {
    firebase.initializeApp(config);
    db = firebase.firestore();
    auth = firebase.auth();
  }

  static getInstance(){
    return db;
  }

  static getAuthInstance(){
    return auth;
  }


  static getOffers(){
    return db.collection("offers").get()
    .then(querySnapshot => {
      const offersArray = [];
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        offersArray.push({ id : doc.id, data : doc.data() });
      });
      return offersArray;
    });
  }
}
export default DB;