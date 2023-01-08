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
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FeaturesComponent,
    FeaturedProductsComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { 
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
   }

}
