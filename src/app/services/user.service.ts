import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: 'password123'
    },
    {
      id: 2,
      name: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      username: 'janesmith',
      password: 'password456'
    },
    {
      id: 3,
      name: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@example.com',
      username: 'alicej',
      password: 'password789'
    },
    {
      id: 4,
      name: 'Bob',
      lastname: 'Brown',
      email: 'bob.brown@example.com',
      username: 'bobb',
      password: 'password101'
    },
    {
      id: 5,
      name: 'Charlie',
      lastname: 'Davis',
      email: 'charlie.davis@example.com',
      username: 'charlied',
      password: 'password202'
    },
    {
      id: 6,
      name: 'David',
      lastname: 'Evans',
      email: 'david.evans@example.com',
      username: 'davide',
      password: 'password303'
    },
    {
      id: 7,
      name: 'Eva',
      lastname: 'Green',
      email: 'eva.green@example.com',
      username: 'evag',
      password: 'password404'
    },
    {
      id: 8,
      name: 'Frank',
      lastname: 'Harris',
      email: 'frank.harris@example.com',
      username: 'frankh',
      password: 'password505'
    },
    {
      id: 9,
      name: 'Grace',
      lastname: 'Ivy',
      email: 'grace.ivy@example.com',
      username: 'gracei',
      password: 'password606'
    },
    {
      id: 10,
      name: 'Henry',
      lastname: 'Jones',
      email: 'henry.jones@example.com',
      username: 'henryj',
      password: 'password707'
    }
  ];
  
  constructor() { }

  findAll(): Observable<User[]> { // como es que sirve el observable 
    return of(this.users); // buscar como es que sirve of y rxjs
  }
}
