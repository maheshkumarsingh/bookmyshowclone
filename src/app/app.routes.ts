import { Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';

export const routes: Routes = [
    {path: 'create-user', component: CreateUserComponent},
    {path: '**', redirectTo: 'create-user', pathMatch: 'full'},
];
