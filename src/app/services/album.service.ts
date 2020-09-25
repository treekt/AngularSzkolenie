import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albumEndpoint = 'https://api.spotify.com/v1/albums';

  constructor(private http: HttpClient) { }

  getTracks(id: string): Observable<any> {
    return this.http.get(this.albumEndpoint + '/' + id + '/tracks');
  }
}
