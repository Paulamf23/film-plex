import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  results: any[];
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private _http: HttpClient) { }

  // Obtener 20 mejores películas
  getTopMovies(): Observable<ApiResult> {
    return this._http.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}`);
  }

  // Obtener datos de películas
  getMovieDetails(id: string): Observable<any> {
    return this._http.get(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }

  // Buscar todas las películas
  searchMovies(query: string): Observable<ApiResult> {
    return this._http.get<ApiResult>(
      `${environment.baseUrl}/search/movie?api_key=${environment.apiKey}&query=${query}`
    );
  }

  // Obtener lista de géneros
  getGenres(): Observable<any> {
    return this._http.get(`${environment.baseUrl}/genre/movie/list?api_key=${environment.apiKey}`);
  }

  // Obtener películas por género
  getMoviesByGenre(genreId: number): Observable<ApiResult> {
    return this._http.get<ApiResult>(`${environment.baseUrl}/discover/movie?api_key=${environment.apiKey}&with_genres=${genreId}`);
  }
}
