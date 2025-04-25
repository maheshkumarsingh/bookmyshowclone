import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  userForm!: FormGroup;
  users: User[] = [];


  ngOnInit(): void {
    this.getAllUsers();
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }
  getAllUsers(): void{
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    });
  }
  onCreateUserSubmit() {
    if (this.userForm.valid) {
      const newUser : User = this.userForm.value;
      this.userService.createUser(newUser).subscribe({
        next: (createUser) =>{
          this.users.push(createUser);
          this.userForm.reset;
        },
        error: (error) => console.error('User creation failed: ', error)
      })
    } else {
      this.userForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
  onCancel() {
    this.userForm.reset();
  }
}
