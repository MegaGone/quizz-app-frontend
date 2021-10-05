import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authSvc: AuthService, private router: Router ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.authSvc.validateToken().pipe(
        tap( isAuth => {

          if( !isAuth) {
            this.router.navigateByUrl('/login')
          }

        })
      )
  }
  
}
