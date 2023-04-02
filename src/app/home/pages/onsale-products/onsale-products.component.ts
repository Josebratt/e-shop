import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-onsale-products',
  templateUrl: './onsale-products.component.html',
  styleUrls: ['./onsale-products.component.css'],
})
export class OnsaleProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endsubs$: Subject<unknown> = new Subject();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this._getOnSaleProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getOnSaleProducts() {
    this.productService
      .onSaleProducts(5)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((data) => {
        this.products = data;
      });
  }
}
