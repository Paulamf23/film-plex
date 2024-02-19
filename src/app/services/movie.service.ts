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

  getTopMovies(): Observable <ApiResult>{
    return this._http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}`
      );
  }

  getMovieDetails(id: string){
    return this._http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
      );

  }
}
