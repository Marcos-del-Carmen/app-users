import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})

export class FormUserComponent {
  user: User;
  @Input() banderaBoton : boolean;
  @Output() banderaBotonEventEmitter = new EventEmitter();
  newUserEventEmitter = new EventEmitter();

  constructor() {
    this.user = new User;
    this.banderaBoton = false;
  }

  onSubmit(userFrom: NgForm) : void {
    if(userFrom.valid) {
      this.newUserEventEmitter.emit(this.user);
      // console.log('¡Nuevo! ',this.user);
    } else {
      console.log('El formulario es invalido para crear')
    }

    userFrom.reset();
    userFrom.resetForm();
    this.onClose();
  }

  onClear(userFrom: NgForm): void {
    this.user = new User();
    userFrom.reset();
    userFrom.resetForm();
  }

  onClose() {
    this.banderaBotonEventEmitter.emit();
  }
}
