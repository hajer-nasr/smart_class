import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListCoursesComponent } from './admin/list-courses/list-courses.component';
import { CourseFormComponent } from './admin/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './admin/users/users.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListCoursesComponent,
    CourseFormComponent,
    UsersComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
