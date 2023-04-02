import { ORDER_STATUS } from 'src/app/interfaces/order.constants';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders: any[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  getOrders() {
    this.orderService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe(data => {
      this.orders = data;
    });
  }

  showOrder(id: string) { 
    this.router.navigateByUrl(`/admin/order/${id}`);
  }

}
