import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowProductComponent implements OnInit {

  product!: Product;

  constructor(
    private productService: ProductService,
    private activatedRoute:ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  /**
   * get the details of the product
   */
  getProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProduct(id).subscribe(
        (data) => {
          this.product = data;
        }
      )
    } 
  }

  /**
   * return to the previous page
   */
  onBack(){
    this.location.back();
  }
}
