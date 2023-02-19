import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API_URL_ORDERS = environment.apiURL + 'orders';
  API_URL_PRODUCTS = environment.apiURL + 'products';

  constructor(
    private httpClient: HttpClient
  ) { }

  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.API_URL_ORDERS, order);
  }

  getProduct(productId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL_PRODUCTS}/${productId}`);
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.API_URL_ORDERS);
  }

  getOrder(id: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.API_URL_ORDERS}/${id}`);
  }
}
