import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL = environment.apiURL + 'categories';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Obtiene todas las categorias
   */
   getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL);
  }

  /**
   * Get details of category by id
   * @param id 
   * @returns 
   */
  getCategory(id:string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.API_URL}/${id}`);
  }

  /**
   * save new category
   * @param category 
   * @returns 
   */
  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.API_URL, category);
  }

  /**
   * update category
   * @param category 
   * @returns
   */
  updateCategpry(id: string, category: Category): Observable<Category> { 
    return this.httpClient.put<Category>(`${this.API_URL}/${id}`, category);
  }
  
  /**
   * delete category
   * @param id 
   * @returns
   */
  deleteCategory(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.API_URL}/${id}`);
  }
}
