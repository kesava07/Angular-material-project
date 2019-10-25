import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSer: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.authSer.getUser()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }

}
