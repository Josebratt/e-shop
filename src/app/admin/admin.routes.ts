import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../guard/authguard.guard';

import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './pages/categories/add/add.component';
import { ListComponent } from './pages/categories/list/list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/products/add/add.component';
import { ListProductComponent } from './pages/products/list/list.component';
import { ShowProductComponent } from './pages/products/show/show.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthguardGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category', component: ListComponent },
      { path: 'category/add', component: AddComponent },
      { path: 'category/add/:id', component: AddComponent },
      { path: 'product', component: ListProductComponent},
      { path: 'product/add', component: AddProductComponent },
      { path: 'product/add/:id', component: AddProductComponent },
      { path: 'product/show/:id', component: ShowProductComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}