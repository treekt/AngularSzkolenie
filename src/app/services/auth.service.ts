import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthConfig} from '../shared/auth-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authorizationUrl = 'https://accounts.spotify.com/authorize';

  private authConfig: AuthConfig = {
    response_type: 'token',
    client_id: '5c2fac535de64c22a9a046ee324e10cb',
    scope: encodeURIComponent('user-read-private user-read-email'),
    redirect_uri: encodeURIComponent('http://localhost:4200/authorized'),
    show_dialog: true
  };

  constructor() {
  }

  public authorize() {
    window.location.href = this.buildAuthUri();
  }

  private buildAuthUri(): string {
    const params = [];
    for (const [key, value] of Object.entries(this.authConfig)) {
      params.push(`${key}=${value}`);
    }
    return `${this.authorizationUrl}?${params.join('&')}`;
  }
}
