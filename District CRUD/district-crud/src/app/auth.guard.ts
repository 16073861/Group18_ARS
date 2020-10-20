import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RegisterService } from '../app/register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: RegisterService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('UserToken') == null) {
      // return false;
      this.router.navigate(['/Login']);
    }
    else {

      let role = next.data["roles"] as string;

      if (role) {
        debugger;
        if (role == localStorage.getItem('UserRole')) {
          return true;
        }
        else {
          this.router.navigate(['/forbidden']);
        }

      }

      return true;
    }

  }

}