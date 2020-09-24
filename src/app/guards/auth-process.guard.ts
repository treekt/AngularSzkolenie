import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthResponse} from '../shared/auth-response';
import {fromPairs} from 'lodash';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthProcessGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authResponse: AuthResponse = this.extractAuthResponse(next.fragment);
    if (authResponse) {
      this.tokenService.saveToken(authResponse.access_token);
      this.router.navigate(['/home']);
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }

  extractAuthResponse(fragment: string): AuthResponse {
    if (!!fragment) {
      const splitFragment = fragment
        .split('&')
        .map((s) => s.split('='));

      return fromPairs(splitFragment) as AuthResponse;
    }
    return null;
  }

}
