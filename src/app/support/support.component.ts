import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SupportService } from '../services/support.service';
import { Support } from './support.model';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit ,OnDestroy{
  supportSubscription!:Subscription;
  supports:Support[]=[];
  supportForm!: FormGroup;


  constructor(
    private supportService:SupportService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService
    
  ) { }

  ngOnInit(): void {
    this.supportSubscription=this.supportService.supportSubject.subscribe(
      (supports:Support[]) => {
        this.supports=supports;       
      }
    );

    this.initForm();
  }

  initForm(){
    this.supportForm=this.formBuilder.group(
      {
        name:['',Validators.required],
        email:['',[Validators.required, Validators.email]],
        message:['',Validators.required],
      }
    );
  }

  onSaveForm(){
    const name = this.supportForm.get('name')?.value;
    const email = this.supportForm.get('email')?.value;
    const message = this.supportForm.get('message')?.value;

    const newSupport = new Support(name,email,message);
    this.toastr.success(this.supportForm.controls['name'].value + ' thank you for your trust, we will answer you soon.');


  }

   
  ngOnDestroy(): void {
    this.supportSubscription.unsubscribe();

  }
}
