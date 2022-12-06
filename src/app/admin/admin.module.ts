import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';

import { AdminRoutingModule } from './admin.routes';

import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ListComponent } from './pages/categories/list/list.component';
import { AddComponent } from './pages/categories/add/add.component';
import { ShowComponent } from './pages/products/show/show.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ListComponent,
    AddComponent,
    ShowComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
