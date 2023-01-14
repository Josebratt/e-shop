import { CartService } from 'src/app/services/cart.service';

import { Product } from 'src/app/interfaces/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  quantity = 1;
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getProduct();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  /**
   * get product details
   */
  private _getProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productService
        .getProduct(id)
        .pipe(takeUntil(this.endsubs$))
        .subscribe((data) => {
          this.product = data;
        });
    }
  }

  onAddToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };
    this.cartService.setCartItem(cartItem);
  }
}
