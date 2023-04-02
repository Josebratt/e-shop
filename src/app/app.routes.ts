import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {
        path: '', 
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'admin', 
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    { path: 'login', component: LoginComponent},
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{ useHash: true})],
    exports: [RouterModule],
})

export class AppRoutingModule { }