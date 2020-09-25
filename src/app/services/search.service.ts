import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  searchEndpoint = 'https://api.spotify.com/v1/search';

  constructor(private http: HttpClient) { }

  search(type: string, query: string): Observable<any> {
    const params = {
      q: query,
      type
    };
    return this.http.get(this.searchEndpoint, { params });
  }


}
