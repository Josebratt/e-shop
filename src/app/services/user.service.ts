import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = environment.apiURL + 'users';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * get all users
   * @returns 
   */
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_URL);
  }

  /**
   * Get details of user by id
   * @param id 
   * @returns 
   */
  getUser(id:string): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/${id}`);
  }

  /**
   * save new user
   * @param user 
   * @returns 
   */
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL, user);
  }

  /**
   * update user
   * @param user 
   * @returns
   */
  updateUser(id: string, user: User): Observable<User> { 
    return this.httpClient.put<User>(`${this.API_URL}/${id}`, user);
  }
  
  /**
   * delete user
   * @param id 
   * @returns
   */
  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.API_URL}/${id}`);
  }
}
