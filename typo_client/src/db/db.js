import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let db = null;

class DB {
  static initializeApp(config) {
    firebase.initializeApp(config);
    db = firebase.firestore();
  }

  static getInstance(){
    return db;
  }

  static getAuthInstance(){
    return firebase.auth();
  }

  static getAuthProviders(){
    return [firebase.auth.GoogleAuthProvider.PROVIDER_ID,];
  }

  static getLoggedInUser(){
    return {
      name : this.getAuthInstance().currentUser.displayName,
      image_url: this.getAuthInstance().currentUser.photoURL
    }
  }

  static signOut(){
    this.getAuthInstance().signOut();
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