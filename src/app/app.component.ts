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