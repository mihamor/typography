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



  static subcribeToOfferChange(callback, id){
    db.collection("offers").doc(id).onSnapshot(callback);
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

  static async insertComment(offerId, content, username){
    //regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
    const commentRef = await db.collection("offers").doc(offerId).collection("comments").add({
      username,
      content,
      addedAt : new Date()
    });
    // await offerRef.update({
    //   comments: firebase.firestore.FieldValue.arrayUnion(commentRef)
    // });
    return commentRef.id;
  }


  static async getOfferById(id){
    const offerRef = db.collection("offers").doc(id);
    const offer = await offerRef.get();
    let result = null;
    if (offer.exists){
      result = offer.data();
      result.id = id;
      // const commentPromises = result.comments.map(commentRef => {
      //   return commentRef.get();
      // });
      // let comments = await Promise.all(commentPromises);
      let comment 
      comments = comments.map(comment => ({ id : comment.id, data: comment.data()}));

      result.comments = comments;
      console.log("populated", result);
    } else throw new Error("No such offer");
    return result;
  }
}
export default DB;