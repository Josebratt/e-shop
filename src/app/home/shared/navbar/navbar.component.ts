import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId!: string;

  constructor(
    private localStorage: LocalstorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getIdToken();
  }

  getIdToken () {
    const token = this.localStorage.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      
      if (tokenDecode.userId) {        
        return this.userId = tokenDecode.userId;
      }
    }
  }

  logoutUser() {
    this.authService.logout();
  }

}
