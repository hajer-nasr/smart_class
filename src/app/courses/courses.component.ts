import { Component, Inject, Input, OnInit } from '@angular/core';
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
export class CoursesComponent implements OnInit {

  courses:Course[]=[];
  coursesSubscription!:Subscription;
  categ:string='';
  DeveloperCours:any[]=[];
  MarketingCours:any[]=[];
  BusinessCours:any[]=[];
  PhotographyCours:any[]=[];

  constructor(private router:Router,  private courseService:CourseService,@Inject(DOCUMENT) private document: Document) { }
  
  ngOnInit(): void {
      this.coursesSubscription=this.courseService.coursesSubject.subscribe(
        (courses:Course[]) => {
          this.courses=courses;       
        }
      );
      this.courseService.getCourses();
      this.courseService.emitCourses();
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

  onWatch(id: number) {
    var lien=this.courses[id].href;
    this.document.location.href =lien;
  }
    
  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }

  onCategory(param:string){
      this.DeveloperCours=[];
      this.BusinessCours=[];
      this.MarketingCours=[];
      this.PhotographyCours=[]; 
      this.categ=param;
     
      this.courses.filter((cours)=>{ 
          if(cours.category === 'Developer'){
            console.log(this.DeveloperCours.includes(cours.category))
            this.DeveloperCours.push(cours)
          }
          if(cours.category === 'Marketing' ){
            this.MarketingCours.push(cours)
          }
          if(cours.category === ' Photography' ){
            this.PhotographyCours.push(cours)
          }
      })
        this.courseService.getCourses(); 
        this.courseService.emitCourses();
  }
}