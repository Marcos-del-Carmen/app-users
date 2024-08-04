import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { FormUserComponent } from '../form-user/form-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title : string = 'Este una aplicacion de usuarios';
  users: User[] = [];
  userSelected : User;
  currentId: number = 10;
  mensaje : string;
  banderaBoton : boolean;

  constructor(private _serviceUser: UserService) {
    this.userSelected = new User;
    this.mensaje = '';
    this.banderaBoton = false;
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
    console.log('Se va agregar un nuevo usuario o editar')
    if(user.id > 0) {
      this.users = this.users.map(u => (u.id === user.id) ? {...user} : u)
      
      // this.users = this.users.map(u => {
      //   if(u.id === user.id) 
      //     return {...user }
      //   return u; // se logra redicir a un operador ternario
      // });
      this.mensaje = 'Se actualizado el usuario';
    } else {
      this.users = [...this.users, {...user, id: this.currentId++}];
      this.mensaje = 'Se a guardado correctamente';
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: this.mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }

  setSeletedUser(userRow: User) : void {
    this.userSelected = {...userRow}
    this.banderaBoton = true;
    console.log('Usuario seleccionado ', this.userSelected)
  }

  onCloseBtn() {
    this.banderaBoton = !this.banderaBoton;
  }
}
