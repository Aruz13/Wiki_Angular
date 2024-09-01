import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character`);
  }

  getEpisodes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode`);
  }

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/location`);
  }

}