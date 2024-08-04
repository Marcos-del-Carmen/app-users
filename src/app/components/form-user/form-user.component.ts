import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html'
})

export class FormUserComponent {
  user: User;

  @Output() newUserEventEmitter = new EventEmitter();

  constructor() {
    this.user = new User;
  }

  onSubmit(){
    this.newUserEventEmitter.emit(this.user);
    console.log('¡Nuevo! ',this.user);
  }
}
