import { OrderService } from './../../../services/order.service';
import { Router } from '@angular/router';
import { CartService } from './../../../services/cart.service';
import { UserService } from './../../../services/user.service';
import { OrderItem } from './../../../interfaces/order-item';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/interfaces/order';
import { Cart } from 'src/app/interfaces/cart';
import { ORDER_STATUS } from 'src/app/interfaces/order.constants';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;
  orderItems: OrderItem[] = [];
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private localStorage: LocalstorageService
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCartItems();
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
    });
  }

  getId () {
    const token = this.localStorage.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      
      if (tokenDecode.userId) {        
        return this.userId = tokenDecode.userId;
      }
    }
  }

  placeOrder() {
    this.getId();
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      address: this.fc['address'].value,
      city: this.fc['city'].value,
      zip: this.fc['zip'].value,
      phone: this.fc['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    }
    
    this.orderService.createOrder(order).subscribe(
      () => { 
        this.cartService.emptyCart();
        this.router.navigate(['/']); 
      }
    
    );
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items!.map(
      data => {
        return {
          product: data.productId,
          quantity: data.quantity
        }
      }
    )
    
  }

  /**
   *  form controls abreviation to better handled
   */
  get fc(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
