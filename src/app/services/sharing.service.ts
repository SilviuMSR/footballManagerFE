import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CustomHttpService } from './custom-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  
  adminCheck: boolean = true;
  loggedIn: boolean = false;
  name : string;
  password : string;

  constructor(private http: CustomHttpService) { 
    
  }

  checkLogged()
  {
    this.http.get('/checkLogged?name=' + this.name + "password=" + this.password).subscribe();
  }

  get isLoggedInAndAdmin()
  {
    if(this.loggedIn == true && this.adminCheck == true)
      return true;
    else return false;
  }

  get isLoggedInAndCoach()
  {
    if(this.loggedIn == true && this.adminCheck == false)
      return true;
    else return false;
  }

  setAdminOptions()
  {
    this.adminCheck = true;
  }

  setUserOptions()
  {
    this.adminCheck = false;
  }

  setLoggedIn()
  {
    this.loggedIn = true;
  }

  setLoggedOut()
  {
    this.loggedIn = false;
  }
}
