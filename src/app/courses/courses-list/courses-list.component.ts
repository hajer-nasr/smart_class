import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../courses/courses.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit,OnDestroy,OnChanges {

  courses:Course[]=[];
  coursesSubscription!:Subscription;
  developerCours:any[]=[];
  constructor(private courseService:CourseService, private router:Router,@Inject(DOCUMENT) private document: Document) { }
  ngOnChanges(): void {
        console.log('yello')
        this.courses.map((cours)=>{
          // cours.category === 'Developer'
          //   console.log('oke')
          if(cours.category === 'Developer'){
            console.log(this.developerCours.includes(cours.title))
            this.developerCours.push(cours)
          }
            
          
        })
        console.log('course:', this.courses)
        console.log('dev: ', this.developerCours)
  }
  ngOnInit(): void {
    this.coursesSubscription=this.courseService.coursesSubject.subscribe(
      (courses:Course[]) => {
        this.courses=courses;
        // courses.map((cours)=>{
        //   // cours.category === 'Developer'
        //   //   console.log('oke')
        //   if(cours.category === 'Developer'){
        //     console.log(this.developerCours.includes(cours.title))
        //     this.developerCours.push(cours)
        //   }
            
          
        // })
        // console.log('course:', courses)
        // console.log('dev: ', this.developerCours)
      }
    );
    this.courseService.getCourses();
    this.courseService.emitCourses();
  }

  // ngAfterContentChecked(){

        
  //       this.courses.map((cours)=>{
  //         // cours.category === 'Developer'
  //         //   console.log('oke')
  //         if(cours.category === 'Developer'){
  //           console.log(this.developerCours.includes(cours.title))
  //           this.developerCours.push(cours)
  //         }
            
          
  //       })
  //       console.log('course:', this.courses)
  //       console.log('dev: ', this.developerCours)
      
  // }
  onNewCourse() {
    this.router.navigate(['/courses','new']);
  }
  onDeleteCourse(course: Course) {
    this.courseService.removeCourse(course);
  }

  onViewCourse(id: number) {
    this.router.navigate(['/courses', 'view', id]);
  }

  onWatch(id: number) {
    var lien=this.courses[id].href;
    this.document.location.href =lien;


  }
  
  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }
}
