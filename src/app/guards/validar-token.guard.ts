import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private service: AuthService,private router: Router) {}

  // validarToken(){
  //   this.service.ValidarToken()
  // }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean {
    return this.service.ValidarToken().pipe(
      tap((valid)=> {
        if(!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean {
    console.log('canLoad');
    return this.service.ValidarToken().pipe(
      tap((valid)=> {
        if(!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    )
  }
}
