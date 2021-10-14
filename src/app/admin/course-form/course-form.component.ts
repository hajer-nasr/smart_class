import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../courses/courses.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseForm!:FormGroup;
  pictureIsUploading=false;
  pictureUrl!:string;
  pictureUploaded=false;
  videoIsUploading=false;
  videoUrl!:string;
  videoUploaded=false;
  constructor(
    private formBuilder:FormBuilder,
    private courseService:CourseService,
    private router:Router,
    private  toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.courseForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['',Validators.required],
      href: ['',Validators.required],
      duration: ['', Validators.required],
      level: ['', Validators.required],
      date: ['', Validators.required],
      details: ['',Validators.required],
    });
  }
  
  onSaveCourse() {
    const id = this.courseForm.get('id')?.value;
    const title = this.courseForm.get('title')?.value;
    const category = this.courseForm.get('category')?.value;
    const description = this.courseForm.get('description')?.value;
    const duration = this.courseForm.get('duration')?.value;
    const level = this.courseForm.get('level')?.value;
    const date = this.courseForm.get('date')?.value;
    const details = this.courseForm.get('details')?.value;

    const newCourse = new Course(id,title,category,description,duration,level,date,details);

    if(this.pictureUrl && this.pictureUrl !== '') {
      newCourse.photo = this.pictureUrl;
    }
    this.courseService.createNewCourse(newCourse);
    this.toastr.success(this.courseForm.controls['title'].value + ' successfully added!');

    this.router.navigate(['/courses']);
  }

  onUploadPicture(file: File): void {
    this.pictureIsUploading = true;

    this.courseService.uploadPicture(file).then(
      (url:any) => {
        this.pictureUrl = url;
        this.pictureIsUploading = false;
        this.pictureUploaded = true;
      }
    );
}

onUploadVideo(file: File): void {
  this.videoIsUploading = true;

  this.courseService.uploadVideo(file).then(
    (url:any) => {
      this.videoUrl = url;
      this.videoIsUploading = false;
      this.videoUploaded = true;
    }
  );
}

detectPictures(event:any){
  this.onUploadPicture(event.target.files[0]);
}
detectVideos(event:any){
  this.onUploadVideo(event.target.files[0]);
}

ResetForm() {
  this.courseForm.reset();
}  
}
