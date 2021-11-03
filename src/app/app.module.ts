import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { AuthService } from './services/auth.service';
//import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import {CourseService} from './services/course.service';
//import { CourseFormComponent } from './modules/admin/admin/course-form/course-form.component';
import { CoursesListItemComponent } from './courses/courses-list-item/courses-list-item.component';
import { ToastrModule } from 'ngx-toastr';
// import { AddCourseComponent } from './admin/add-course/add-course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SupportComponent } from './support/support.component';
import { SupportService } from './services/support.service';
import { SingleCourseComponent } from './courses/single-course/single-course.component';
import { AuthGuardService } from './services/auth-guard.service';
//import { AdminComponent } from './admin/admin.component';
//import { ListCoursesComponent } from './admin/list-courses/list-courses.component';
//import { AdminModule } from './modules/admin/admin.module';

//  const appRoutes:Routes= [
// {path:'auth/signup', component:SignupComponent},
// {path:'auth/signin', component: SigninComponent},
// {path:'courses',canActivate: [AuthGuardService],component:CoursesComponent},
// {path:'admin/courses/new',component:CourseFormComponent},
// {path:'home',component:HomeComponent},
// {path:'admin',component:AdminComponent},
// {path:'support',component:SupportComponent},
// { path:'courses/view/:id',canActivate: [AuthGuardService], component: SingleCourseComponent },
// { path: 'admin/view-courses', component: ListCoursesComponent},
// { path: 'About-Us', component: AboutUsComponent },

// {path:'',redirectTo:'home',pathMatch:'full'},
// {path:'**',redirectTo:'home'} 
// ] 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    CoursesComponent,
    HomeComponent,
    //CourseFormComponent,
    CoursesListItemComponent,
    FooterComponent,
    AboutUsComponent,
    SupportComponent,
    SingleCourseComponent,
    //AdminComponent,
    //ListCoursesComponent,
    // AddCourseComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    //AdminModule ,
    AppRoutingModule
  ],
  providers: [
    AuthService,CourseService,
    SupportService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
