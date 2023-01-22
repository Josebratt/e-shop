import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './pages/features/features.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { AuthguardGuard } from '../guard/authguard.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: FeaturesComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartPageComponent },
      {
        path: 'checkout',
        canActivate: [AuthguardGuard],
        component: CheckOutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
