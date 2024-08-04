import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title : string = 'Este una aplicacion de usuarios';
  users: User[] = [];

  constructor(private _serviceUser: UserService) {

  }

  ngOnInit(): void {
    this._serviceUser.findAll().subscribe(
      response => {
        this.users = response;
      }
    )
  }

  removeUser(id: number) : void {
    this.users = this.users.filter(user => user.id != id);
  }

  addUser(user : User) {
    this.users = [...this.users, {...user}];
  }

}
