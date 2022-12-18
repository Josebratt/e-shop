import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiURL + 'users';

  constructor(
    private httpClient: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<User>{
    return this.httpClient.post<User>(`${this.API_URL}/login`, {email, password});
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

}
