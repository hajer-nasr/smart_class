import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../courses/courses.model';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseForm!:FormGroup;
  fileIsUploading=false;
  fileUrl!:string;
  fileUploaded=false;
  constructor(private formBuilder:FormBuilder, private courseService:CourseService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['',Validators.required],
      href: ['',Validators.required]
    });
  }
  
  onSaveCourse() {
    const title = this.courseForm.get('title')?.value;
    const category = this.courseForm.get('category')?.value;
    const description = this.courseForm.get('description')?.value;
    const href = this.courseForm.get('href')?.value;

    const newCourse = new Course(title, category,description,href);
    if(this.fileUrl && this.fileUrl !== '') {
      newCourse.photo = this.fileUrl;
    }
    this.courseService.createNewCourse(newCourse);
    this.router.navigate(['/courses']);
  }

  onUploadFile(file: File): void {
    this.fileIsUploading = true;

    this.courseService.uploadFile(file).then(
      (url:any) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
}

detectFiles(event:any){
  this.onUploadFile(event.target.files[0]);
}



}
