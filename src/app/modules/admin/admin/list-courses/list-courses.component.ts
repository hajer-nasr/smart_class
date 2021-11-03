import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Course } from 'src/app/courses/courses.model';
import { CourseService } from 'src/app/services/course.service';

@Input()
@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit,OnDestroy {
  @Input()
  courses:Course[]=[];
  coursesSubscription!:Subscription;
  AllCours:any[]=[];

  constructor(private courseService:CourseService) 
   { }
  
  ngOnInit(): void {
    this.coursesSubscription=this.courseService.coursesSubject.subscribe(
      (courses:Course[]) => {
        this.courses=courses;  
      }
    );
    this.courseService.getCourses();
    this.courseService.emitCourses();
     this.courses.filter((cours)=>{ 
     
             this.AllCours.push(cours);
               });
    }
 

  onDeleteCourse(course: Course) {
    this.courseService.removeCourse(course);
  }

  ngOnDestroy(){
    this.coursesSubscription.unsubscribe();
  }

}
