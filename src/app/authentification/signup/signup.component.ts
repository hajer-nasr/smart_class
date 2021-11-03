import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { user } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage!:string;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.signupForm=this.formBuilder.group(
      {
        fname:['',[Validators.required, Validators.minLength(2)]],
        lname:['',[Validators.required, Validators.minLength(2)]],
        birthDate:['',[Validators.required]],
        sexe:['',[Validators.required]],
        niveau:['',[Validators.required]],
        specialite:['',[Validators.required]],
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
        
      }
    );
  }

onCreate() {
  const fname=this.signupForm.get('fname')?.value;
  const lname=this.signupForm.get('lname')?.value;
  const birthDate=this.signupForm.get('birthDate')?.value;
  const sexe=this.signupForm.get('sexe')?.value;
  const niveau=this.signupForm.get('niveau')?.value;
  const specialite=this.signupForm.get('specialite')?.value;
  const email=this.signupForm.get('email')?.value;
  const password=this.signupForm.get('password')?.value;

  const newUser=new user(fname,lname,birthDate,sexe,niveau,specialite,email);
  this.authService.createNewUser(newUser);
  console.log("add fel firebase");

  this.authService.signUpUser(email,password).then(
    () => {
      this.router.navigate(['home']);
      this.toastr.success(this.signupForm.controls['fname'].value + ' your account is successfully created !');

    },
    (error) => {
      this.errorMessage=error;
    }
  )
}

}
