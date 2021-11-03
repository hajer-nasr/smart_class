import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CourseFormComponent } from './admin/course-form/course-form.component';
import { ListCoursesComponent } from './admin/list-courses/list-courses.component';
import { UsersComponent } from './admin/users/users.component';

const adminroutes: Routes = [
  {path:'',component:AdminComponent},
  {path:'view', component:ListCoursesComponent},
  {path:'new', component:CourseFormComponent},
  {path:'users',component:UsersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(adminroutes)],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule { }
