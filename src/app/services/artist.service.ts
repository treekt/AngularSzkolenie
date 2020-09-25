import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  artistEndpoint = 'https://api.spotify.com/v1/artists';

  constructor(private http: HttpClient) {
  }

  getArtist(id: string): Observable<any> {
    return this.http.get(this.artistEndpoint + '/' + id);
  }

  getArtistAlbums(id: string): Observable<any> {
    return this.http.get(this.artistEndpoint + '/' + id + '/albums');
  }
}
