import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { user } from 'src/app/authentification/signup/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Input()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,OnDestroy {
  @Input()
  users:user[]=[];
  usersSubscription!:Subscription;
  usersg:any[]=[];

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.usersSubscription=this.authService.userSubject.subscribe(
      (users:user[]) => {
        this.users=users;
      }
    );
    this.authService.getUsers();
    this.authService.emitUsers();
    this.users.filter((users)=>{
      this.usersg.push(users);

    });
  }

  onDeleteUser(user:user){
    this.authService.removeUser(user);

  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

  

}
