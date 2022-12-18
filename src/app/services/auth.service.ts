import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiURL + 'users';

  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string): Observable<User>{
    return this.httpClient.post<User>(`${this.API_URL}/login`, {email, password});
   }
}
