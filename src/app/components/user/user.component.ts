import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input() users: User[] = [];

  @Output() idUserEventEmitter = new EventEmitter();
  @Output() selectedUserEventEmitter = new EventEmitter();

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
        this.idUserEventEmitter.emit(id);
        Swal.fire({
          title: "Se elimino!",
          text: "El registro se elimino correctamente.",
          icon: "success"
        });
      }
    });
  }

  onSelectedUser(user: User): void {
    console.log('Informacion del usuario ', user)
    this.selectedUserEventEmitter.emit(user);
  }
}
