import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})

export class FormUserComponent implements OnInit {
  user: User;
  @Input() banderaBoton : boolean;
  @Output() banderaBotonEventEmitter = new EventEmitter();

  constructor(
    private router: Router, 
    private _serviceSharingData: SharingDataService,
  ) {
    if(this.router.getCurrentNavigation()?.extras.state) {
      this.user = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.user = new User();
    }
    this.banderaBoton = false;
  }

  ngOnInit(): void {
    // console.log('Usuario ',this.user); 
  }

  onSubmit(userFrom: NgForm) : void {
    if(userFrom.valid) {
      this._serviceSharingData.newUserEventEmitter.emit(this.user);
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
