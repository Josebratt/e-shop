import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  /**
   * setToken 
   * @param data 
   */
  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }

  /**
   * Get the current token
   * @returns 
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  /**
   * Delete the current token
   */
  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
