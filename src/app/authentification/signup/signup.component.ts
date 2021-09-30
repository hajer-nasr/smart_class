import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage!:string;

  constructor(private formBuilder:FormBuilder, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.signupForm=this.formBuilder.group(
      {
        fname:['',[Validators.required]],
        lname:['',[Validators.required]],
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
      alert("votre compte créer");
    },
    (error) => {
      this.errorMessage=error;
    }
  )
}

}
