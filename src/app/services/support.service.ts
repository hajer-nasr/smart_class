import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Datasnapshot= firebase.database.DataSnapshot;
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/database';
import 'firebase/storage';
import { ToastrService } from "ngx-toastr";
import { Support } from "../support/support.model";

@Injectable()
export class SupportService {

  supports:Support[]=[];
  supportSubject=new Subject<Support[]>();

  emitSupports() {
    this.supportSubject.next(this.supports);
  }
  
  constructor(   
    //    private toastr:ToastrService
    ){
  }

  saveSupports(){
    firebase.database().ref('/support').set(this.supports);
  }


  
}
