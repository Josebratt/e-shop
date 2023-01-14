import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  totalPrice = 0;
  isCheckout = false;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe().subscribe(
      (cart) => {
        if (cart) { 
          cart.items?.map((item) => {
            this
          })
        }
      }
    )
  }

}
