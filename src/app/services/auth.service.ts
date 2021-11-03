import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';
import { Injectable } from "@angular/core";
import { user } from "../authentification/signup/user.model";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import Datasnapshot= firebase.database.DataSnapshot;
// import { User } from "angularfire2/node_modules/firebase";

@Injectable()
export class AuthService {
    users:user[]=[];
    userSubject=new Subject<user[]>();
    
    constructor(
        private toastr:ToastrService
    ){
        this.getUsers();

    }

    emitUsers() {
        this.userSubject.next(this.users);
    }
    saveUsers(){
        firebase.database().ref('/users').set(this.users);
    }

    getUsers(){
        firebase.database().ref('/users').on(
            'value',(data:Datasnapshot) => {
                this.users=data.val()? data.val() : [];
                this.emitUsers();

            }
        )
    }

    createNewUser(newUser:user){

        this.users.push(newUser);
        this.saveUsers();
        this.emitUsers();

    }

    
    
    signUpUser(email:string,password:string){
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

    signOutUser() {
        firebase.auth().signOut();
    }

    removeUser(User:user){
        if (window.confirm('Are sure you want to delete this user ?')) { 
            const courseIndexToRemove = this.users.findIndex(
                (userEl) => {
                  if(userEl === User) {
                    return true;
                  }
                  else {
                    return false;
                  }
                }
              );
              this.users.splice(courseIndexToRemove, 1);
              this.saveUsers();
              this.emitUsers();
              this.toastr.success(User.fname + ' successfully removed !');
        }
    }
}
