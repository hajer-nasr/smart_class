import { Injectable } from "@angular/core";
import { Course} from "../courses/courses.model";
import { Subject } from "rxjs";
import Datasnapshot= firebase.database.DataSnapshot;
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth'; 
import 'firebase/database';
import 'firebase/storage';

@Injectable()
export class CourseService {

  courses:Course[]=[];
  coursesSubject=new Subject<Course[]>();

  emitCourses() {
    this.coursesSubject.next(this.courses);
  }
  
  constructor(){
    this.getCourses();
  }



  saveCourses(){
    firebase.database().ref('/courses').set(this.courses);
  }

  // getCourses() {
  //   firebase.database().ref('/courses')
  //   .on('value', (data: DataSnapshot) => {
  //       this.courses = data.val() ? data.val() : [];
  //       this.emitCourses();
  //     }
  //   );

  // }

  getCourses(){
    firebase.database().ref('/courses').on(
      'value',(data:Datasnapshot) => {
        this.courses=data.val()? data.val() : [];
        this.emitCourses();
      }
    );
  }

  
  getSingleCourse(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/coursess/' + id).once('value').then(
          (data:Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewCourse(newCourse: Course) {
    this.courses.push(newCourse);
    this.saveCourses();
    this.emitCourses();
  }

  removeCourse(course:Course ) {
    if(course.photo) {
      const storageRef = firebase.storage().refFromURL(course.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const courseIndexToRemove = this.courses.findIndex(
      (courseEl) => {
        if(courseEl === course) {
          return true;
        }
        else {
          return false;
        }
      }
    );
    this.courses.splice(courseIndexToRemove, 1);
    this.saveCourses();
    this.emitCourses();
  }


  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                console.log('Upload successful! ('+downloadUrl+')');
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
  }

  
}
