import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from './courses.model';
import { CourseService } from '../services/course.service';
import { DOCUMENT } from '@angular/common';

@Input ()
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit,OnDestroy   {
// @Input()
  courses:Course[]=[];
  coursesSubscription!:Subscription;
  categ:string='';
  DeveloperCours:any[]=[];
  MarketingCours:any[]=[];
  BusinessCours:any[]=[];
  PhotographyCours:any[]=[];
  DesignCours:any[]=[];
  AllCours:any[]=[];


  constructor(private router:Router,
      private courseService:CourseService,
      @Inject(DOCUMENT) private document: Document
      )  { 
      }
  
     ngOnInit(): void {
      this.coursesSubscription=this.courseService.coursesSubject.subscribe(
        (courses:Course[]) => {
          this.courses=courses;  
        }
      );
      this.courseService.getCourses();
      this.courseService.emitCourses();
      this.onCategory('');
  }

  onNewCourse() {
    this.router.navigate(['/courses','new']);
  }
      
  onDeleteCourse(course: Course) {
    this.courseService.removeCourse(course);
    }
    

  onViewCourse(id: number) {
    this.router.navigate(['/courses', 'view', id]);
  }

 

  onCategory(param:string){
      this.DeveloperCours=[];
      this.BusinessCours=[];
      this.MarketingCours=[];
      this.PhotographyCours=[]; 
      this.DesignCours=[];
      this.AllCours=[];
      this.categ=param;
      this.courses.filter((cours)=>{ 
        if(cours.category === ''){
          this.AllCours.push(cours);
        }
          if(cours.category === 'Developer'){
            this.DeveloperCours.push(cours);
            this.AllCours.push(cours);
          }
          if(cours.category === 'Marketing' ){
            this.MarketingCours.push(cours);
            this.AllCours.push(cours);

          }
          if(cours.category === ' Photography' ){
            this.PhotographyCours.push(cours);
            this.AllCours.push(cours);

          }
          if(cours.category === 'Business' ){
            this.BusinessCours.push(cours);
            this.AllCours.push(cours);

          }
          if(cours.category === 'Design' ){
            this.DesignCours.push(cours);
            this.AllCours.push(cours);

          }
      })
        this.courseService.getCourses(); 
        this.courseService.emitCourses();
  }
  
  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }

}