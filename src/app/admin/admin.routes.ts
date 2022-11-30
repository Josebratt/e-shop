import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // children: [
    //   { path: 'category', component: ListCategoryComponent },
    //   { path: 'category/add', component: AddCategoryComponent },
    //   { path: 'category/add/:id', component: AddCategoryComponent },
    //   { path: 'product', component: ListProductComponent },
    //   { path: 'product/add', component: AddProductComponent },
    //   { path: 'product/add/:id', component: AddProductComponent },
    //   { path: 'product/show/:id', component: ShowProductComponent }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}