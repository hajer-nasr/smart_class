import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';
import { Course } from '../courses/courses.model';
import { Subscription } from 'rxjs';
import { CourseService } from '../services/course.service';
// import { CoursesComponent } from '../courses/courses.component';

@Input()

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
courses:Course[]=[];
coursesSubscription!:Subscription;
categ:string='';
HomeCours:any[]=[];
isAuth!:boolean;

  constructor(
    private router:Router,
    private AuthService:AuthService,
    private courseService:CourseService
    ) {
     }

  ngOnInit(): void {
          firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth=true;
        }
        else {
          this.isAuth=false;
        }
      }
    )
    this.getCourses();
    this.onHomeCourses();

  }


  onAccess() {
      this.router.navigate(['auth','signin']);
  }

  getCourses(){
    this.coursesSubscription=this.courseService.coursesSubject.subscribe(
      (courses:Course[]) => {
        this.courses=courses;       
      }
    );
    this.courseService.getCourses();
    this.courseService.emitCourses();
  
}
onHomeCourses(){
  this.HomeCours=[];
  this.courses.filter((cours)=>{ 
      if(cours.id == 1 || cours.id == 2 ||cours.id == 3 ||cours.id == 4 ||cours.id == 5 || cours.id == 9){ 
        this.HomeCours.push(cours);
      }
  })
    this.courseService.getCourses(); 
    this.courseService.emitCourses();

}

ngOnDestroy() {
  this.coursesSubscription.unsubscribe();
}

onMore(){
  this.router.navigate(['courses']);

}

}
