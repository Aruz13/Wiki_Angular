import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/character?page=${page}`;
    return this.http.get<any>(url);
  }

  getEpisodes(page?: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode?page=${page}`);
  }

  getLocations(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/location?page=${page}`);
  }

  getPage(url: string): Observable<any> {
    console.log(url)
    return this.http.get(url);
  }

}