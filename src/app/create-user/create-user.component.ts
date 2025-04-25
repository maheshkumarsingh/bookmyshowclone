import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  userForm!: FormGroup;
  users: User[] = [];

  // 🔁 State for interactivity
  isSubmitting = false;
  submissionMessage = '';
  isSuccess = true;

  ngOnInit(): void {
    this.getAllUsers();
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    });
  }

  onCreateUserSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submissionMessage = '';

    const newUser: User = this.userForm.value;

    this.userService.createUser(newUser).subscribe({
      next: (createdUser: User) => {
        this.users.push(createdUser);
        this.userForm.reset();
        this.isSubmitting = false;
        this.isSuccess = true;
        this.submissionMessage = 'User created successfully!';
      },
      error: (error) => {
        console.error('User creation failed:', error);
        this.isSubmitting = false;
        this.isSuccess = false;
        this.submissionMessage = 'Failed to create user. Please try again.';
      }
    });
  }

  onCancel(): void {
    this.userForm.reset();
    this.submissionMessage = '';
  }
}