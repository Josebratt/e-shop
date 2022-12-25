import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  endsubs$: Subject<unknown> = new Subject();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  getProducts() {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((data) => (this.products = data));
  }
}
