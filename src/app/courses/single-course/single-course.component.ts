import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../courses.model';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss']
})
export class SingleCourseComponent implements OnInit {
course!:Course;
  constructor(private router:Router,private courseService:CourseService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.course = new Course(0, '','','','','','','');

    const id = this.route.snapshot.params['id'];
    console.log('id course', id)
    this.courseService.getSingleCourse(+id).then(
      (course:Course) => {
        this.course = course;
      }
    );
  }

  
  onBack() {
    this.router.navigate(['/courses']);
  }


  }


