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
}
