import { ProductService } from './../../../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListProductComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  /**
   * get all products and show in a table
   */
  getProducts() {
    this.productService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe({
      next: (data) => {
        this.products = data;        
        setTimeout(() => {
          $('#table').DataTable({
            retrieve: true,
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [10, 25, 50],
            dom: 'Bfrtip'              
          });
        }, 1);
      },
      error: (error) => console.error(error),
    })
  }

  /**
   * redirectTo show page
   * @param id 
   */
  onShow(id: string) {
    this.router.navigateByUrl(`admin/product/show/${id}`);
  }

  /**
   * redirectTo update page
   * @param id 
   */
  onUpdate(id: string) {
    this.router.navigateByUrl(`admin/product/add/${id}`);
  }

  /**
   * Delete product
   * @param id 
   */
  onDelete(id:string){ 
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
        this.productService.deleteProduct(id).pipe(takeUntil(this.endsubs$)).subscribe(
          (data) => {
            this.getProducts();
            if (data) {
              Swal.fire('Borrado!', 'El producto ha sido borrado', 'success');
            }
          }
        )
      }
    });
  }

}
