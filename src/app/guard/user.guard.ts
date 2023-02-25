import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorage: LocalstorageService
    ) { }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.localStorage.getToken();

      if (token) {
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        
        if (!this._tokenExpired(tokenDecode.exp)) {        
          return true;
        }
      }
      
      this.router.navigate(['/login']);
      return false;
  }

    /**
   * get true if token is expired
   * @param expiration 
   * @returns 
   */
    private _tokenExpired(expiration: number): boolean {
      return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
  
}
