import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { CoursesComponent } from './courses/courses.component';
import { SingleCourseComponent } from './courses/single-course/single-course.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SupportComponent } from './support/support.component';
import { AdminModule } from './modules/admin/admin.module';

const appRoutes:Routes= [
    {path:'auth/signup', component:SignupComponent},
    {path:'auth/signin', component: SigninComponent},
    {path:'courses',canActivate: [AuthGuardService],component:CoursesComponent},
    //{path:'admin/courses/new',component:CourseFormComponent},
    {path:'home',component:HomeComponent},
   // {path:'admin',component:AdminComponent},
    {path:'support',component:SupportComponent},
    { path:'courses/view/:id',canActivate: [AuthGuardService], component: SingleCourseComponent },
    //{ path: 'admin/view-courses', component: ListCoursesComponent},
    { path: 'About-Us', component: AboutUsComponent },
    
    {path:'admin', loadChildren:() => import('./modules/admin/admin.module').then(m=>m.AdminModule) },
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'**',redirectTo:'home'} 
    ] 

    @NgModule({
        imports: [
            RouterModule.forRoot(appRoutes)
        ],
        exports: [RouterModule],
        declarations: []
      })
      export class AppRoutingModule { }