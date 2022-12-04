import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './pages/categories/add/add.component';
import { ListComponent } from './pages/categories/list/list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category', component: ListComponent },
      { path: 'category/add', component: AddComponent },
      { path: 'category/add/:id', component: AddComponent },
    //   { path: 'product', component: ListProductComponent },
    //   { path: 'product/add', component: AddProductComponent },
    //   { path: 'product/add/:id', component: AddProductComponent },
    //   { path: 'product/show/:id', component: ShowProductComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}