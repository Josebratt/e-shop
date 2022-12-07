import { ProductService } from './../../../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListProductComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  getProducts() {
    this.productService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe({
      next: (data) => {
        this.products = data;
        setTimeout(() => {
          $('#table').DataTable({
            retrieve: true,
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
            dom: 'Bfrtip'              
          });
        }, 1);
      },
      error: (error) => console.error(error),
    })
  }

  onShow(id: string) {

  }
  onUpdate(id: string) {

  }
  onDelete(id: string) {

  }

}
