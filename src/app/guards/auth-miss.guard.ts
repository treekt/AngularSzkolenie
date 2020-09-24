import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthMissGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken();

    if (!token && state.url !== '/auth') {
      this.router.navigate(['/auth']);
      return false;
    } else if (!!token && state.url === '/auth') {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

  // private isActivePath(pathName: string): boolean {
  //   return window.location.pathname === pathName;
  // }

}
