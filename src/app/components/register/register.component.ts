import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CustomHttpService } from 'src/app/services/custom-http.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users : User[] = [];
  cname : string;
  cpassword : string;
  cteam : string;

  constructor(private http: CustomHttpService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
  }

  saveUserToDb(){
    this.http.post('/saveUser', {name: this.cname, password: this.cpassword, teamname: this.cteam}).subscribe(value => {
      /*if(value == 0) console.log("Successfuly created account");
      else if(value == -1) console.log("Please insert username and password");
      else if(value == 1) console.log("Already existing account with this teamname");
      else if(value == 2) console.log("Already existing accound with this username and password");*/
      if(value) this.toastrService.success('Successfully created account');
      else this.toastrService.error("Failed to create account");
    });
  }

}
