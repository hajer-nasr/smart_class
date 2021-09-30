import { Component } from '@angular/core';
import firebase from "firebase/app";
import "firebase/firestore";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
constructor(){

  const firebaseConfig = {
    // apiKey: "AIzaSyCOpvN89iBN1K9sbbyzSQ7i3P61JDeh9Xk",
    // authDomain: "smart-class-919be.firebaseapp.com",
    // databaseURL: "https://smart-class-919be-default-rtdb.firebaseio.com",
    // projectId: "smart-class-919be",
    // storageBucket: "smart-class-919be.appspot.com",
    // messagingSenderId: "179071534889",
    // appId: "1:179071534889:web:f2915b191d2ddc01aa1938",
    // measurementId: "G-26JYGEVDCW"

    apiKey: "AIzaSyAyFAEFwq5Pyww0bZmzewVMJVXbmXm8d6s",
  authDomain: "smart-class-6728d.firebaseapp.com",
  databaseURL: "https://smart-class-6728d-default-rtdb.firebaseio.com",
  projectId: "smart-class-6728d",
  storageBucket: "smart-class-6728d.appspot.com",
  messagingSenderId: "303177422967",
  appId: "1:303177422967:web:53304d791ef6d6dfbe4e72",
  measurementId: "G-MB7FDS1VXQ"

  };

firebase.initializeApp(firebaseConfig);
}

}