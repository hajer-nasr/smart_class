import { Component, Inject, OnInit } from '@angular/core';
import { Course } from '../../courses.model';
import { CourseService } from 'src/app/services/course.service';
import { Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss']
})

export class CoursesListItemComponent implements OnInit {
  @Input()
  course!: Course;
 
  constructor(@Inject(DOCUMENT) private document: Document , private courseService:CourseService) { }

  ngOnInit(): void {
    console.log('course list item component ')
    console.log('item :', this.course)
  }
  onWatch() {
    var lien=this.course.href;
    this.document.location.href =lien;
  }  
  
  onDeleteCourse(course: Course) {
    this.courseService.removeCourse(course);
  }

}


