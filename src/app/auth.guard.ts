import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharingService } from './services/sharing.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { CustomHttpService } from './services/custom-http.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: SharingService,
    private http: CustomHttpService,
    private router: Router,
    private toastr : ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('token') == "admintoken")
    {
      return true;
    }
    else
    {
      this.router.navigate(['login']);
      this.toastr.error("Sorry you need to be authenticated as admin in order to access this route!");
      localStorage.clear();
      return false;
    }
  }

}
