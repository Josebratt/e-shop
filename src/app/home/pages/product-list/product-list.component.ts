import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  endsubs$: Subject<unknown> = new Subject();

  currentPagingPage!: number;

  constructor(
    private productService: ProductService,
    public uiService: UiService
  ) { }

  ngOnInit(): void {
    this._getProduct();
    this.uiService.currentPagingPage$.pipe(takeUntil(this.endsubs$)).subscribe(
      (page) => this.currentPagingPage = page
    )
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getProduct() {
    this.productService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(
      (data) => this.products = data
    )
  }

  onSort(sortBy: string) {

  }


}
