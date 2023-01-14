import { OrderService } from './../../../services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice = 0;
  isCheckout = false;

  endSubs$: Subject<unknown> = new Subject();

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      if (cart) {
        cart.items?.map((item) => {
          this.orderService
            .getProduct(item.productId!)
            .pipe(take(1))
            .subscribe((data) => {
              this.totalPrice += data.priceSell * item.quantity!;
            });
        });
      }
    });
  }
}
