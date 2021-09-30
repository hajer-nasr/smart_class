import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { AuthService } from './services/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import {CourseService} from './services/course.service';

import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CoursesListItemComponent } from './courses/courses-list/courses-list-item/courses-list-item.component';


 const appRoutes:Routes= [
{path:'auth/signup', component:SignupComponent},
{path:'auth/signin', component: SigninComponent},
{path:'courses',component:CoursesComponent},
{path:'liste',component:CoursesListComponent},
{path:'courses/new',component:CourseFormComponent},
{path:'home',component:HomeComponent},
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'**',redirectTo:'home'} 

] 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    CoursesComponent,
    HomeComponent,
    CoursesListComponent,
    CourseFormComponent,
    CoursesListItemComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HttpClientModule,
   
  ],
  providers: [
    AuthService,CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
