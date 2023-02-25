import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItemDetailed } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  productDetails: CartItemDetailed[] = [];
  quantity = 0;

  endSubs$: Subject<unknown> = new Subject();

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe((cart) => {
      this.productDetails = [];
      cart.items?.forEach((item) => {
        this.productService.getProduct(item.productId!).subscribe((data) => {
          this.productDetails.push({
            product: data,
            quantity: item.quantity,
          });
        });
      });
    });
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.target.value      },
      true
    );
  }

  onRemove(cartItem: CartItemDetailed) {
    this.cartService.delCartItem(cartItem.product.id);
  }

  onBacktoShop() {
    this.router.navigateByUrl('/products');
  }
}
