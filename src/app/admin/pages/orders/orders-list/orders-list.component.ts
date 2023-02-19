import { ORDER_STATUS } from 'src/app/interfaces/order.constants';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: any[] = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data; console.log(data);
    });
  }

  showOrder(id: string) { 
    this.router.navigateByUrl(`/admin/order/${id}`);
  }

}
