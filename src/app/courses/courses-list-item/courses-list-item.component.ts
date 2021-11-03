import { Component, Inject, OnInit } from '@angular/core';
import { Course } from '../courses.model';
import { CourseService } from 'src/app/services/course.service';
import { Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss']
})

export class CoursesListItemComponent implements OnInit {
  @Input()
  course!: Course;
  constructor(@Inject(DOCUMENT) private document: Document , private courseService:CourseService,private router:Router) { }

  ngOnInit(): void {
  }

  onDeleteCourse(course: Course) {
    this.courseService.removeCourse(course);
  }
  
  onViewCourse(id: number) {
    this.router.navigate(['/courses/', 'view', id]);
    
  }

  // update(id:number){
  //   this.courseService.updateCourse(id);

  // }



}


