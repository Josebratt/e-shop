import { CartItem } from './../../../interfaces/cart';
import { CartService } from './../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  onAddToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1

    }
    this.cartService.setCartItem(cartItem);
  }

}
