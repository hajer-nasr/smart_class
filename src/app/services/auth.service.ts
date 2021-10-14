import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';
import { Injectable } from "@angular/core";
@Injectable()
export class AuthService {
    
    createNewUser(email:string,password:string){
        return new Promise<void>(
            (resolve,reject) => {
                firebase.auth().createUserWithEmailAndPassword(email,password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }
    signInUser(email:string,password:string) {
        return new Promise<void>(
            (resolve,reject) => {
                firebase.auth().signInWithEmailAndPassword(email,password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);

                    }
                );
            }
        );
    }

    signInAdmin(email:string,password:string){
        return new Promise<void>(
            (resolve,reject) => {
                firebase.auth().signInWithEmailAndPassword(email,password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);

                    }
                );
            }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }

}
