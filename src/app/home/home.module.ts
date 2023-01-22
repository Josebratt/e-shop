import { CartService } from './../services/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routes';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FeaturesComponent } from './pages/features/features.component';
import { FeaturedProductsComponent } from './pages/featured-products/featured-products.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductItemComponent } from './pages/product-item/product-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartIconComponent } from './pages/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FeaturesComponent,
    FeaturedProductsComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductItemComponent,
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckOutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { 
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
   }

}
