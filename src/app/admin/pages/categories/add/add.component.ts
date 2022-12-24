import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmited = false;
  editmode = false;

  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  /**
   * Initialize the form
   */
  formInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  /**
   * check if exist id in the Url
   */
  private checkEditMode(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editmode = true;
      this.categoryService
        .getCategory(id)
        .pipe(takeUntil(this.endsubs$))
        .subscribe((category) => {
          this.fc['name'].setValue(category?.name);
        });
    }
  }

  /**
   *
   * @returns
   */
  onSubmit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.fc['name'].value,
    };

    if (this.editmode) {
      this.onUpdate(id!, category);
    } else {
      this.saveCategory(category);
    }
  }

  /**
   * save category
   * @param category
   */
  saveCategory(category: Category) {
    this.categoryService
      .createCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: (category) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `La categoria ${category.name} ha sido guardada`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.location.back();
        },
        error: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'La categoria no ha sido guardada',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
  }

  /**
   * update category
   * @param id
   * @param category
   */
  onUpdate(id: string, category: Category) {
    this.categoryService
      .updateCategpry(id, category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: (category) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `La categoria ${category.name} ha sido actualizada`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.location.back();
        },
        error: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'La categoria no ha sido actualizada',
            showConfirmButton: false,
            timer: 1500,
          });
        },
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
