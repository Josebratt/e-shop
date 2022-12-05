import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categories: Category[] = [];

  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getCategories() {
    this.categoryService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(
      (data) => { this.categories = data }
    )
  }

  onUpdate(id: string) {

  }

  onDelete(id: string) {
    
  }

}
