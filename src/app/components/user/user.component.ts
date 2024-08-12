import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule, NavBarComponent],
  templateUrl: './user.component.html'
})
export class UserComponent {
  title: string = 'Aplicación de usuarios';
  users: User[] = [];

  constructor(
    private router: Router, 
    private _serviceSharingData: SharingDataService, 
    private _serviceUser: UserService
  ) {
    
    if(this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this._serviceUser.findAll().subscribe(data => this.users = data);
    }
    console.log('Usuarios', this.users);
  }

  onRemoveUser(id: number) : void {
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "El registro se perdera",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._serviceSharingData.idUserEventEmitter.emit(id);
        Swal.fire({
          title: "Se elimino!",
          text: "El registro se elimino correctamente.",
          icon: "success"
        });
      }
    });
  }

  onSelectedUser(user: User): void {
    // this._serviceSharingData.selectedUserEventEmitter.emit(user);
    this.router.navigate(['/users/edit', user.id], {state: {user}});
  }
}
