import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API_URL_ORDERS = environment.apiURL + 'orders';
  API_URL_PRODUCTS = environment.apiURL + 'products';

  constructor(
    private httpClient: HttpClient
  ) { }

  getProduct(productId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL_PRODUCTS}/${productId}`);
  }
}
