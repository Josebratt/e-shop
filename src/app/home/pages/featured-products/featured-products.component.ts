import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getFeaturedProducts() {
    this.productService.featuredProduct(4).pipe(takeUntil(this.endsubs$)).subscribe(
      (data) => this.products = data
    )
  }

}
