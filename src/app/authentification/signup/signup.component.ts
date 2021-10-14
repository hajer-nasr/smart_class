import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage!:string;

  constructor(private formBuilder:FormBuilder, private router:Router,
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
        speacialite:['',[Validators.required]],
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
        
      }
    );
  }

onCreate() {
  const email=this.signupForm.get('email')?.value;
  const password=this.signupForm.get('password')?.value;
  this.authService.createNewUser(email,password).then(
    () => {
      this.router.navigate(['home']);
      this.toastr.success(this.signupForm.controls['fname'].value + ' your account is successfully created!');

    },
    (error) => {
      this.errorMessage=error;
    }
  )
}

}
