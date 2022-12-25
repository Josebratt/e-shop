import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css'],
})
export class UseraddComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmited = false;
  editmode = false;

  users: User[] = [];

  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  /**
   * Initialize the form
   */
  private _initForm() {
    this.form = this.fb.group({
      firstNames: ['', Validators.required],
      lastNames: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isAdmin: [false],
    });
  }

  private checkEditMode(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editmode = true;
      this.userService
        .getUser(id)
        .pipe(takeUntil(this.endsubs$))
        .subscribe((user) => {
          this.fc['firstNames'].setValue(user?.firstNames);
          this.fc['lastNames'].setValue(user?.lastNames);
          this.fc['address'].setValue(user?.address);
          this.fc['city'].setValue(user?.city);
          this.fc['zip'].setValue(user?.zip);
          this.fc['phone'].setValue(user?.phone);
          this.fc['email'].setValue(user?.email);
          this.fc['password'].setValue(user?.password);
          this.fc['isAdmin'].setValue(user?.isAdmin);
        });
    }
  }

  onSubmit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      lastNames: this.fc['lastNames'].value,
      firstNames: this.fc['firstNames'].value,
      email: this.fc['email'].value,
      password: this.fc['password'].value,
      phone: this.fc['phone'].value,
      isAdmin: this.fc['isAdmin'].value,
      address: this.fc['address'].value,
      zip: this.fc['zip'].value,
      city: this.fc['city'].value,
    };

    console.log(user);
    

    if (this.editmode) {
      this.updateUser(id!, user);
    } else {
      this.saveUser(user);
    }
  }

  saveUser(user: User) {
    console.log(user.firstNames);
    this.userService
      .createUser(user)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `El Usuario ha sido guardado`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.location.back();
        },
        error: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `El Usuario no ha sido guardado`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  updateUser(id: string, user: User) {
    this.userService
      .updateUser(id, user)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: (user) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `El Usuario ${user.firstNames} ha sido actualizado`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.location.back();
        },
        error: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El Usuario no ha sido actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  /**
   * Cancel the operation and return to the previous page
   */
  onCancel() {
    this.location.back();
  }

  /**
   *  form controls abreviation to better handled
   */
  get fc(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
