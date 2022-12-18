import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin(): void {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.fc['email'].value, this.fc['password'].value)
     .subscribe({
      next: (data) => {
       console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `${error.error}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (error.status === 404) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `${error.error}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
    // this.form.reset();
    
    
    
  }

    /**
   *  form controls abreviation to better handled
   */
    get fc(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }

}
