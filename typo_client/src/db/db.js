import firebase from 'firebase/app';
import 'firebase/firestore';

class DB {
  constructor(config) {
   this.config = config
   this.firebase = firebase;
  }
  initializeApp() {
    this.firebase.initializeApp(this.config)
  }

  getInstance(){
    return this.firebase;
  }

}
export default DB;