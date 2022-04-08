import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cocktail, CocktailData } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  constructor(private http: HttpClient) {
  }

  fetchCocktails(id?: string) {
    const url = id ? `/cocktails?user=${id}` : '/cocktails';
    return this.http.get<Cocktail[]>(environment.apiUrl + url);
  }

  fetchCocktail(id: string) {
    return this.http.get<Cocktail>(`${environment.apiUrl}/cocktails/${id}`);
  }

  createCocktail(cocktailData: CocktailData) {
    const formData = new FormData();

    Object.keys(cocktailData).forEach(key => {
      if (cocktailData[key] !== null) {
        if (key === 'ingredients') {
          JSON.stringify(cocktailData[key]);
        }
        formData.append(key, cocktailData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/cocktails', formData);
  }

  removeCocktail(id: string) {
    return this.http.delete(environment.apiUrl + '/cocktails/' + id);
  }

  publishCocktail(id: string) {
    return this.http.post(`${environment.apiUrl}/cocktails/${id}/publish`, {});
  }
}
