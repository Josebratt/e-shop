import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../interfaces/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  /**
   * initial localstorage cart
   */
  initCartLocalStorage() {
    const cart: Cart = this.getCart();

    if (!cart.items?.length) {
      const intialCart = {
        items: []
      };
  
      const intialCartJson = JSON.stringify(intialCart);

      localStorage.setItem(CART_KEY, intialCartJson);
    }
  }

  getCart(): Cart { 
    const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');   
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();

    const cartItemExist = cart.items?.find(
      (item) => item.productId === cartItem.productId
    );
    if (cartItemExist) {
      cart.items!.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity! + cartItem.quantity!;
          }  
        }
      });
    } else {      
      cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);

    return cart;
  }
}
