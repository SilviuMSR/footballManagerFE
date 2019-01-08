import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Auth2Guard implements CanActivate {

  constructor(private router: Router,
    private toastr : ToastrService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem('token') == "coachtoken")
      {
        return true;
      }
      else
      {
        this.router.navigate(['login']);
        this.toastr.error("Sorry you need to be authenticated as coach in order to access this route!");
        localStorage.clear();
        return false;
      }
  }
}
