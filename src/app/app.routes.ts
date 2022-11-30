import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'admin', 
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }