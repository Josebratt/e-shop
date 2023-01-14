import { CartItemDetailed } from './../../../interfaces/cart';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  productDatails: CartItemDetailed[] = [];
  quantity = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe(
      (cart) => { 
        cart.items!.forEach(item => {
          this.productService.getProduct(item.productId!).subscribe(
            (data) => {
              this.productDatails.push({
                product: data,
                quantity: item.quantity
              });
            }
          )
        })
      }
    )
  }

  onRemove() {

  }

  onBacktoShop() {
    this.router.navigateByUrl('/products');
  }

}
