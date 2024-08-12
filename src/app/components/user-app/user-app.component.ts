import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { FormUserComponent } from '../form-user/form-user.component';

import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, FormUserComponent, RouterOutlet, NavBarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title : string = 'Este una aplicacion de usuarios';
  users: User[] = [];
  userSelected : User;
  currentId: number = 10;
  mensaje : string;
  banderaBoton : boolean;

  constructor(private _serviceUser: UserService,
    private _serviceSharingData: SharingDataService
  ) {
    this.userSelected = new User();
    this.mensaje = '';
    this.banderaBoton = false;
  }

  ngOnInit(): void {
    this._serviceUser.findAll().subscribe( response => {
      this.users = response 
      // console.log('usuarios del response ', this.users);
    });
    this.userSelected = new User();
    this.addUser();
    this.removeUser();
    this.setSeletedUser();
  }


  addUser() {
    this._serviceSharingData.newUserEventEmitter.subscribe(user => {
      if(user.id > 0) {
        this.users = this.users.map(u => (u.id === user.id) ? {...user} : u)
        this.mensaje = 'Se actualizado el usuario';
      } else {
        this.users = [...this.users, {...user}];
        this.mensaje = 'Se a guardado correctamente';
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: this.mensaje,
        showConfirmButton: false,
        timer: 1500
      });
      this.userSelected = new User();
    })

  }

  removeUser() : void {
    this._serviceSharingData.idUserEventEmitter.subscribe(id => {
      this.users = this.users.filter(user => user.id != id);
    })
  }

  setSeletedUser() : void {
    this._serviceSharingData.selectedUserEventEmitter.subscribe(userRow => {
      // console.log('fila seleccinada ', userRow);
      this.userSelected = {...userRow}
    })
    this.banderaBoton = true;
  }

  onCloseBtn() {
    this.banderaBoton = !this.banderaBoton;
  }
}
