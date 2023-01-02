import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  editmode = false;
  isSubmited = false;
  form!: FormGroup;
  currentProductId = '';

  categories: Category[] = [];

  imageDisplay?: string = '';

  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.getCategories();
    this._checkEditMode();
  }

  /**
   * unsubscribe function
   */
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  /**
   * Initialize the form
   */
  private _initForm() {
    this.form = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      priceBuy: ['', Validators.required],
      priceSell: [''],
      isFeatured: [false],
      countInStock: ['', Validators.required],
      cloudinary_id: ['']
    });
  }

  /**
   * get the category list
   */
  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      (this.categories = data),
        this.categories.unshift({
          name: 'Seleccione',
          id: '',
        });
    });
  }

  /**
   *
   */
  private _checkEditMode() {
    let id = '';
    this.activatedRoute.params
      .pipe(takeUntil(this.endsubs$))
      .subscribe((params) => {
        id = params['id'];
        if (id) {
          this.editmode = true;
          this.currentProductId = id;
          this.productService.getProduct(id).subscribe((product) => {
            this.fc['sku'].setValue(product.sku);
            this.fc['name'].setValue(product.name);
            this.fc['brand'].setValue(product.brand);
            this.fc['category'].setValue(product.category.id);
            this.fc['priceBuy'].setValue(product.priceBuy);
            this.fc['priceSell'].setValue(product.priceSell);
            this.fc['countInStock'].setValue(product.countInStock);
            this.fc['isFeatured'].setValue(product.isFeatured);
            this.imageDisplay = product.image;
            this.fc['image'].setValidators([]);
            this.fc['image'].updateValueAndValidity();
            this.fc['cloudinary_id'].setValue(product.cloudinary_id);
          });
        }
      });
  }

  /**
   * upload the image and previsualize
   * @param event
   */
  imageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.form.patchValue({ image: file });
      this.fc['image'].updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }
  }

  /**
   * Initialize the load of data
   * @returns
   */
  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.fc).map((key) => {
      productFormData.append(key, this.fc[key].value);
    });

    if (this.editmode) {      
      // console.log(productFormData.get('countInStock'));
      
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  /**
   * method to add a product
   * @param productFormData
   */
  private _addProduct(productFormData: FormData) {
    this.productService
      .saveProduct(productFormData)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((data) => {
        if (data) {
          this.location.back();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto ha sido guardado',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  /**
   * method to update a product
   * @param productForm
   */
  private _updateProduct(productForm: FormData) {
    this.productService
      .updateProduct(productForm, this.currentProductId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((data) => {                
        if (data) {
          this.location.back();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto ha sido actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  /**
   * method to returns to the previous page
   */
  onCancel() {
    this.location.back();
  }

  /**
   * method to abreviate of form controls
   * @Returns
   */
  get fc(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
