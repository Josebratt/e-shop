import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  /**
   * get a list of categories
   */
  private _getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: (data) => {
          this.categories = data;
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
      });
  }

  onUpdate(id: string) {
    this.router.navigateByUrl(`/admin/category/add/${id}`);
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esto no se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).pipe(takeUntil(this.endsubs$)).subscribe({
          next: (data) => {
            this._getCategories();
            if (data) {
              Swal.fire('Borrado!', `La categoria ${data.name} ha sido guardada`, 'success');
            }
            this.refresh();
          },
          error: (error) => console.error(error)
      })
      }
    });
  }

  /**
   * reload the page
   */
  refresh(): void {
    window.location.reload();
  }

}
