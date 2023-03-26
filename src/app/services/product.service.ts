import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL = environment.apiURL + 'products';

  constructor(
    private httpClient: HttpClient
  ) { }

/**
 * get all products
 * @param categoriesFilter 
 * @returns 
 */
  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));            
    }
    return this.httpClient.get<Product[]>(this.API_URL, { params: params});
  }

  /**
   * get product by id
   * @param id
   * @returns 
   */
  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.API_URL}/${id}`);
  }

  /**
   * create a new product
   * @param product
   * @returns 
   */
  saveProduct(product: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.API_URL, product);
  }

  /**
   * update a product
   * @param id 
   * @param productData 
   * @returns 
   */
  updateProduct(productData: FormData, id: string): Observable<Product> {    
    return this.httpClient.put<Product>(`${this.API_URL}/${id}`, productData);
  }

  /**
   * delete a product
   * @param id 
   * @returns 
   */
  deleteProduct(id: string): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.API_URL}/${id}`);
  }

/**
 * get all featured products 
 * @param count 
 * @returns 
 */
  featuredProduct(count: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_URL}/featured/${count}`);
  }

  /**
   * get all on sale products 
   * @param count 
   * @returns 
   */
  onSaleProducts(count: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_URL}/onsale/${count}`);
  }
  
}
