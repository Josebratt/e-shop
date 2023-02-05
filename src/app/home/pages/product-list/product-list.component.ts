import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { SortPipe } from 'src/app/pipe/sort.pipe';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  
  products: Product[] = [];
  categories: Category[] = [];
  p: number = 1;

  endsubs$: Subject<unknown> = new Subject();

  currentPagingPage!: number;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public uiService: UiService,
    private sortPipe: SortPipe
  ) {}

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
    
    // this.uiService.currentPagingPage$
    //   .pipe(takeUntil(this.endsubs$))
    //   .subscribe((page) => (this.currentPagingPage = page));
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((data) => (this.categories = data));
  }

  categoryFilter() {
    const selectedCategories: any[] = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
      
      this._getProducts(selectedCategories)
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productService
      .getProducts(categoriesFilter)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((data) => (this.products = data));
  }

  onSort(sortBy: string) {
    this.sortPipe.transform(
      this.products,
      sortBy.replace(':reverse', ''),
      sortBy.endsWith(':reverse')
    );
    this.uiService.sorting$.next(sortBy);
  }
}
