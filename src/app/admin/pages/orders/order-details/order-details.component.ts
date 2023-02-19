import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order!: Order;
  endsubs$: Subject<unknown> = new Subject();
  currentDay = Date.now();

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._getOrderDetails();
  }

  private _getOrderDetails() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrder(id).subscribe(
        data => {
          this.order = data;
          console.log(data);
          
        }
      )
    }

  }

}
