import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://bookmyshowapi.azurewebsites.net/api/Users';

  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user:User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
